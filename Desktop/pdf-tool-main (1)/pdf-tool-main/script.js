let PDFDocument;
let files = [];
let draggedElement = null;
let selectedPages = new Map(); // Map để lưu các trang được chọn
let isBookletMode = false;

// Đợi thư viện load xong
window.addEventListener('DOMContentLoaded', () => {
    // Kiểm tra và load PDFLib
    if (typeof PDFLib !== 'undefined') {
        PDFDocument = PDFLib.PDFDocument;
    }
    
    // Cấu hình pdf.js worker
    if (typeof pdfjsLib !== 'undefined') {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    }
    
    initializeApp();
});

const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');
const mergeBtn = document.getElementById('mergeBtn');
const bookletBtn = document.getElementById('bookletBtn');
const splitBtn = document.getElementById('splitBtn');
const previewBtn = document.getElementById('previewBtn');
const clearBtn = document.getElementById('clearBtn');
const uploadLabel = document.querySelector('.upload-label');
const previewModal = document.getElementById('previewModal');
const closeModalBtn = document.querySelector('.close-modal');
const closePreviewBtn = document.getElementById('closePreviewBtn');
const downloadPreviewBtn = document.getElementById('downloadPreviewBtn');
const previewContainer = document.getElementById('previewContainer');
const outputFileName = document.getElementById('outputFileName');

function initializeApp() {
    // Xử lý chọn file
    fileInput.addEventListener('change', handleFileSelect);

    // Xử lý kéo thả file vào upload box
    uploadLabel.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadLabel.style.background = '#e8ebff';
    });

    uploadLabel.addEventListener('dragleave', () => {
        uploadLabel.style.background = '#f8f9ff';
    });

    uploadLabel.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadLabel.style.background = '#f8f9ff';
        const droppedFiles = Array.from(e.dataTransfer.files).filter(f => f.type === 'application/pdf');
        if (droppedFiles.length > 0) {
            handleFiles(droppedFiles);
        }
    });

    // Gộp file
    mergeBtn.addEventListener('click', handleMerge);

    // Gộp thành sổ
    bookletBtn.addEventListener('click', handleBookletMerge);

    // Tách file
    splitBtn.addEventListener('click', handleSplit);

    // Xóa tất cả
    clearBtn.addEventListener('click', handleClear);

    // Xem trước
    previewBtn.addEventListener('click', handlePreview);

    // Đóng modal
    closeModalBtn.addEventListener('click', () => {
        previewModal.classList.remove('show');
    });

    closePreviewBtn.addEventListener('click', () => {
        previewModal.classList.remove('show');
    });

    previewModal.addEventListener('click', (e) => {
        if (e.target === previewModal) {
            previewModal.classList.remove('show');
        }
    });

    // Tải về file đã chọn
    downloadPreviewBtn.addEventListener('click', handleDownloadPreview);
}



function handleFileSelect(e) {
    const selectedFiles = Array.from(e.target.files);
    handleFiles(selectedFiles);
}

function handleFiles(newFiles) {
    newFiles.forEach(file => {
        files.push({
            id: Date.now() + Math.random(),
            file: file,
            name: file.name,
            size: file.size,
            role: 'content' // Default role
        });
    });
    renderFileList();
}

function renderFileList() {
    fileList.innerHTML = '';
    
    files.forEach((fileData, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.draggable = true;
        fileItem.dataset.id = fileData.id;
        
        fileItem.innerHTML = `
            <div class="drag-handle">⋮⋮</div>
            <div class="file-header">
                <div class="file-number">${index + 1}</div>
                <button class="delete-btn" onclick="deleteFile(${fileData.id})">×</button>
            </div>
            <div class="file-name">${fileData.name}</div>
            <div class="file-info">${formatFileSize(fileData.size)}</div>
            ${isBookletMode ? `
                <select class="role-select" onchange="updateFileRole(${fileData.id}, this.value)">
                    <option value="content" ${fileData.role === 'content' ? 'selected' : ''}>Nội dung</option>
                    <option value="front" ${fileData.role === 'front' ? 'selected' : ''}>Mặt đầu</option>
                    <option value="back" ${fileData.role === 'back' ? 'selected' : ''}>Mặt cuối</option>
                </select>
            ` : ''}
        `;
        
        // Xử lý kéo thả để sắp xếp lại
        fileItem.addEventListener('dragstart', handleDragStart);
        fileItem.addEventListener('dragend', handleDragEnd);
        fileItem.addEventListener('dragover', handleDragOver);
        fileItem.addEventListener('drop', handleDrop);
        fileItem.addEventListener('dragenter', handleDragEnter);
        fileItem.addEventListener('dragleave', handleDragLeave);
        
        fileList.appendChild(fileItem);
    });
}

function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    document.querySelectorAll('.file-item').forEach(item => {
        item.classList.remove('drag-over');
    });
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter(e) {
    if (this !== draggedElement) {
        this.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    
    if (draggedElement !== this) {
        const draggedId = parseInt(draggedElement.dataset.id);
        const targetId = parseInt(this.dataset.id);
        
        const draggedIndex = files.findIndex(f => f.id === draggedId);
        const targetIndex = files.findIndex(f => f.id === targetId);
        
        // Hoán đổi vị trí
        const temp = files[draggedIndex];
        files.splice(draggedIndex, 1);
        files.splice(targetIndex, 0, temp);
        
        renderFileList();
    }
    
    return false;
}

function deleteFile(id) {
    files = files.filter(f => f.id !== id);
    renderFileList();
}

function updateFileRole(id, role) {
    const file = files.find(f => f.id === id);
    if (file) {
        file.role = role;
    }
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Gộp file
async function handleMerge() {
    isBookletMode = false;
    renderFileList();
    if (files.length < 2) {
        alert('Vui lòng chọn ít nhất 2 file để gộp!');
        return;
    }
    
    // Hỏi tên file
    let fileName = prompt('Nhập tên file (không cần .pdf):', 'merged_file');
    if (fileName === null) return; // Người dùng hủy
    
    fileName = fileName.trim();
    if (!fileName) {
        fileName = 'merged_file';
    }
    fileName = fileName.replace(/\.pdf$/i, '');
    
    mergeBtn.disabled = true;
    mergeBtn.textContent = 'Đang xử lý...';
    
    try {
        const mergedPdf = await PDFDocument.create();
        
        for (const fileData of files) {
            const arrayBuffer = await fileData.file.arrayBuffer();
            const pdf = await PDFDocument.load(arrayBuffer);
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach(page => mergedPdf.addPage(page));
        }
        
        const mergedPdfBytes = await mergedPdf.save();
        downloadFile(mergedPdfBytes, fileName + '.pdf');
        
        alert('Gộp file thành công!');
    } catch (error) {
        alert('Lỗi khi gộp file: ' + error.message);
    } finally {
        mergeBtn.disabled = false;
        mergeBtn.textContent = 'Gộp File';
    }
}

async function handleBookletMerge() {
    if (files.length === 0) {
        alert('Vui lòng chọn ít nhất một file PDF!');
        return;
    }
    
    isBookletMode = true;
    renderFileList(); // Cập nhật danh sách để hiển thị role selector (nếu còn dùng)
    handlePreview();
}

// Tách file
async function handleSplit() {
    isBookletMode = false;
    renderFileList();
    if (files.length === 0) {
        alert('Vui lòng chọn file PDF để tách!');
        return;
    }
    
    splitBtn.disabled = true;
    splitBtn.textContent = 'Đang xử lý...';
    
    try {
        for (const fileData of files) {
            const arrayBuffer = await fileData.file.arrayBuffer();
            const pdf = await PDFDocument.load(arrayBuffer);
            const pageCount = pdf.getPageCount();
            
            for (let i = 0; i < pageCount; i++) {
                const newPdf = await PDFDocument.create();
                const [copiedPage] = await newPdf.copyPages(pdf, [i]);
                newPdf.addPage(copiedPage);
                
                const pdfBytes = await newPdf.save();
                const fileName = fileData.name.replace('.pdf', '') + `_trang_${i + 1}.pdf`;
                downloadFile(pdfBytes, fileName);
            }
        }
        
        alert('Tách file thành công!');
    } catch (error) {
        alert('Lỗi khi tách file: ' + error.message);
    } finally {
        splitBtn.disabled = false;
        splitBtn.textContent = 'Tách File';
    }
}

// Xóa tất cả
function handleClear() {
    if (files.length === 0) return;
    if (confirm('Bạn có chắc muốn xóa tất cả file?')) {
        files = [];
        fileInput.value = '';
        isBookletMode = false;
        renderFileList();
    }
}

// Xem trước
async function handlePreview(e) {
    if (files.length === 0) {
        alert('Vui lòng chọn file PDF để xem trước!');
        return;
    }
    
    // Nếu không gọi từ handleBookletMerge, reset isBookletMode
    if (!e || (e.target && e.target.id !== 'bookletBtn')) {
        // isBookletMode remains what it was unless explicitly reset
        // but if the user just clicks 'Xem Trước' button (id previewBtn), reset it.
        if (e && e.target && e.target.id === 'previewBtn') {
            isBookletMode = false;
        }
    }
    
    renderFileList(); // Cập nhật danh sách để phản ánh đúng isBookletMode state
    
    previewBtn.disabled = true;
    previewBtn.textContent = 'Đang tải...';
    
    try {
        await renderPreview();
        previewModal.classList.add('show');
    } catch (error) {
        alert('Lỗi khi xem trước: ' + error.message);
    } finally {
        previewBtn.disabled = false;
        previewBtn.textContent = 'Xem Trước';
    }
}

// Render preview
async function renderPreview() {
    previewContainer.innerHTML = '';
    selectedPages.clear();
    
    // Tạo mảng chứa tất cả pageDivs để có thể sắp xếp lại trong preview
    const allPageDivs = [];
    
    for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
        const fileData = files[fileIndex];
        
        const arrayBuffer = await fileData.file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        
        // Khởi tạo tất cả trang được chọn
        if (!selectedPages.has(fileData.id)) {
            selectedPages.set(fileData.id, new Set());
            for (let i = 1; i <= pdf.numPages; i++) {
                selectedPages.get(fileData.id).add(i);
            }
        }
        
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const viewport = page.getViewport({ scale: 0.5 });
            
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            
            await page.render({
                canvasContext: context,
                viewport: viewport
            }).promise;
            
            const pageDiv = document.createElement('div');
            pageDiv.className = 'preview-page selected';
            pageDiv.dataset.fileId = fileData.id;
            pageDiv.dataset.pageNum = pageNum;
            pageDiv.dataset.fileIndex = fileIndex;
            pageDiv.draggable = true;
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'page-checkbox';
            checkbox.checked = true;
            checkbox.addEventListener('change', (e) => {
                e.stopPropagation();
                togglePageSelection(fileData.id, pageNum, pageDiv);
            });
            
            const dragHandle = document.createElement('div');
            dragHandle.className = 'page-drag-handle';
            dragHandle.textContent = '⋮⋮';
            
            const pageNumber = document.createElement('div');
            pageNumber.className = 'page-number';
            pageNumber.textContent = `${fileData.name.substring(0, 10)}... (T${pageNum})`;
            
            pageDiv.appendChild(dragHandle);
            pageDiv.appendChild(checkbox);
            pageDiv.appendChild(canvas);
            pageDiv.appendChild(pageNumber);

            // Thêm role selector cho từng trang nếu ở chế độ Booklet
            if (isBookletMode) {
                const pageRoleSelect = document.createElement('select');
                pageRoleSelect.className = 'page-role-select';
                pageRoleSelect.innerHTML = `
                    <option value="content">Nội dung</option>
                    <option value="front">Mặt đầu</option>
                    <option value="back">Mặt cuối</option>
                `;
                // Nếu file này đã có role, mặc định chọn cho tất cả trang của file đó
                if (fileData.role) {
                    pageRoleSelect.value = fileData.role;
                }
                
                pageRoleSelect.addEventListener('change', (e) => {
                    pageDiv.dataset.pageRole = e.target.value;
                    updatePageStyle(pageDiv, e.target.value);
                    // Nếu ở BookletMode, sắp xếp lại preview ngay lập tức
                    reorderPreviewBooklet();
                });
                pageDiv.dataset.pageRole = pageRoleSelect.value;
                updatePageStyle(pageDiv, pageRoleSelect.value);
                pageDiv.appendChild(pageRoleSelect);
            }
            
            pageDiv.addEventListener('click', (e) => {
                if (!e.target.classList.contains('page-checkbox') && !e.target.classList.contains('page-drag-handle') && !e.target.classList.contains('page-role-select')) {
                    checkbox.checked = !checkbox.checked;
                    togglePageSelection(fileData.id, pageNum, pageDiv);
                }
            });
            
            // Thêm sự kiện kéo thả cho trang
            pageDiv.addEventListener('dragstart', handlePageDragStart);
            pageDiv.addEventListener('dragend', handlePageDragEnd);
            pageDiv.addEventListener('dragover', handlePageDragOver);
            pageDiv.addEventListener('drop', handlePageDrop);
            pageDiv.addEventListener('dragenter', handlePageDragEnter);
            pageDiv.addEventListener('dragleave', handlePageDragLeave);
            
            allPageDivs.push(pageDiv);
        }
    }

    if (isBookletMode) {
        // Hiển thị một danh sách phẳng đã sắp xếp theo role
        const bookletContainer = document.createElement('div');
        bookletContainer.className = 'booklet-preview-mode';
        
        const infoMsg = document.createElement('div');
        infoMsg.className = 'booklet-info-msg';
        infoMsg.innerHTML = `
            <strong>Chế độ Gộp Sổ (2-up):</strong><br>
            - Tờ 1: [Mặt cuối] và [Mặt đầu] sẽ nằm chung trên một mặt giấy.<br>
            - Tờ tiếp theo: Các trang [Nội dung] sẽ được ghép cặp 2 trang trên một mặt giấy.<br>
            - Hãy in 2 mặt (Double-sided) để tạo thành cuốn sổ.
        `;
        previewContainer.appendChild(infoMsg);
        
        const sortedPages = sortPagesByRole(allPageDivs);
        sortedPages.forEach(p => previewContainer.appendChild(p));
    } else {
        // Hiển thị theo từng file như cũ
        renderFileBasedPreview(allPageDivs);
    }
}

function sortPagesByRole(pageDivs) {
    const front = [];
    const content = [];
    const back = [];
    pageDivs.forEach(p => {
        const role = p.dataset.pageRole;
        if (role === 'front') front.push(p);
        else if (role === 'back') back.push(p);
        else content.push(p);
    });
    return [...front, ...content, ...back];
}

function reorderPreviewBooklet() {
    if (!isBookletMode) return;
    const allPages = Array.from(document.querySelectorAll('.preview-page'));
    const sorted = sortPagesByRole(allPages);
    
    // Giữ lại info message
    const infoMsg = previewContainer.querySelector('.booklet-info-msg');
    previewContainer.innerHTML = '';
    if (infoMsg) previewContainer.appendChild(infoMsg);
    
    sorted.forEach(p => previewContainer.appendChild(p));
}

function renderFileBasedPreview(allPageDivs) {
    // Nhóm lại theo fileId
    const fileGroups = new Map();
    allPageDivs.forEach(p => {
        const fid = p.dataset.fileId;
        if (!fileGroups.has(fid)) fileGroups.set(fid, []);
        fileGroups.get(fid).push(p);
    });

    fileGroups.forEach((pages, fid) => {
        const fileData = files.find(f => f.id == fid);
        const fileSection = document.createElement('div');
        fileSection.className = 'preview-file-section';
        
        const fileTitle = document.createElement('div');
        fileTitle.className = 'preview-file-title';
        fileTitle.textContent = fileData.name;
        fileSection.appendChild(fileTitle);
        
        const pagesContainer = document.createElement('div');
        pagesContainer.className = 'preview-container';
        pages.forEach(p => pagesContainer.appendChild(p));
        
        fileSection.appendChild(pagesContainer);
        previewContainer.appendChild(fileSection);
    });
}

function togglePageSelection(fileId, pageNum, pageDiv) {
    const filePages = selectedPages.get(fileId);
    
    if (filePages.has(pageNum)) {
        filePages.delete(pageNum);
        pageDiv.classList.remove('selected');
    } else {
        filePages.add(pageNum);
        pageDiv.classList.add('selected');
    }
}

function updatePageStyle(pageDiv, role) {
    pageDiv.classList.remove('role-front-page', 'role-back-page', 'role-content-page');
    if (role === 'front') pageDiv.classList.add('role-front-page');
    else if (role === 'back') pageDiv.classList.add('role-back-page');
    else pageDiv.classList.add('role-content-page');
}

// Xử lý kéo thả trang
let draggedPage = null;

function handlePageDragStart(e) {
    draggedPage = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
}

function handlePageDragEnd() {
    this.classList.remove('dragging');
    document.querySelectorAll('.preview-page').forEach(page => {
        page.classList.remove('drag-over');
    });
}

function handlePageDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handlePageDragEnter() {
    if (this !== draggedPage) {
        this.classList.add('drag-over');
    }
}

function handlePageDragLeave() {
    this.classList.remove('drag-over');
}

function handlePageDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    
    if (draggedPage !== this) {
        const container = this.parentNode;
        const allPages = Array.from(container.children);
        const draggedIndex = allPages.indexOf(draggedPage);
        const targetIndex = allPages.indexOf(this);
        
        if (draggedIndex < targetIndex) {
            container.insertBefore(draggedPage, this.nextSibling);
        } else {
            container.insertBefore(draggedPage, this);
        }
    }
    
    return false;
}

// Tải về file đã chọn
async function handleDownloadPreview() {
    downloadPreviewBtn.disabled = true;
    downloadPreviewBtn.textContent = 'Đang xử lý...';
    
    try {
        const mergedPdf = await PDFDocument.create();
        
        // Lấy tất cả các trang theo thứ tự hiện tại trong DOM
        const allPageDivs = Array.from(document.querySelectorAll('.preview-page'));
        
        if (allPageDivs.length === 0) {
            alert('Không có trang nào để tải!');
            return;
        }
        
        let hasSelectedPages = false;
        let referenceSize = null;

        if (isBookletMode) {
            // CHẾ ĐỘ GỘP SỔ: Dàn trang in (Imposition)
            // Lấy các trang theo vai trò
            const frontPages = [];
            const contentPages = [];
            const backPages = [];

            allPageDivs.forEach(pageDiv => {
                const checkbox = pageDiv.querySelector('.page-checkbox');
                if (!checkbox.checked) return;
                
                const fileId = parseFloat(pageDiv.dataset.fileId);
                const pageNum = parseInt(pageDiv.dataset.pageNum);
                const role = pageDiv.dataset.pageRole;
                
                const pageInfo = { fileId, pageNum };
                if (role === 'front') frontPages.push(pageInfo);
                else if (role === 'back') backPages.push(pageInfo);
                else contentPages.push(pageInfo);
            });

            if (frontPages.length === 0 && backPages.length === 0) {
                alert('Vui lòng chọn ít nhất một trang "Mặt đầu" hoặc "Mặt cuối" để gộp sổ!');
                return;
            }

            // Hàm lấy PDF Page từ pageInfo
            const getPdfPage = async (pageInfo, targetDoc) => {
                const fileData = files.find(f => f.id === pageInfo.fileId);
                const arrayBuffer = await fileData.file.arrayBuffer();
                const srcPdf = await PDFDocument.load(arrayBuffer);
                const [copiedPage] = await targetDoc.copyPages(srcPdf, [pageInfo.pageNum - 1]);
                return copiedPage;
            };

            // Lấy trang chuẩn (reference) để tính kích thước
            const firstPageInfo = frontPages[0] || contentPages[0] || backPages[0];
            const refPage = await getPdfPage(firstPageInfo, mergedPdf);
            const refW = refPage.getWidth();
            const refH = refPage.getHeight();

            // 1. Tạo mặt giấy Bìa (Trang 1 của PDF mới): [Mặt cuối] | [Mặt đầu]
            const coverSheet = mergedPdf.addPage([refW * 2, refH]);
            
            // Vẽ mặt cuối (bên trái)
            if (backPages.length > 0) {
                const backPage = await getPdfPage(backPages[0], mergedPdf);
                backPage.scale(refW / backPage.getWidth(), refH / backPage.getHeight());
                const backEmbed = await mergedPdf.embedPage(backPage);
                coverSheet.drawPage(backEmbed, { x: 0, y: 0, width: refW, height: refH });
            }
            
            // Vẽ mặt đầu (bên phải)
            if (frontPages.length > 0) {
                const frontPage = await getPdfPage(frontPages[0], mergedPdf);
                frontPage.scale(refW / frontPage.getWidth(), refH / frontPage.getHeight());
                const frontEmbed = await mergedPdf.embedPage(frontPage);
                coverSheet.drawPage(frontEmbed, { x: refW, y: 0, width: refW, height: refH });
            }

            // 2. Tạo các mặt giấy nội dung: [Nội dung 1] | [Nội dung 2]
            for (let i = 0; i < contentPages.length; i += 2) {
                const contentSheet = mergedPdf.addPage([refW * 2, refH]);
                
                // Trang bên trái
                const p1 = await getPdfPage(contentPages[i], mergedPdf);
                p1.scale(refW / p1.getWidth(), refH / p1.getHeight());
                const p1Embed = await mergedPdf.embedPage(p1);
                contentSheet.drawPage(p1Embed, { x: 0, y: 0, width: refW, height: refH });
                
                // Trang bên phải (nếu có)
                if (i + 1 < contentPages.length) {
                    const p2 = await getPdfPage(contentPages[i + 1], mergedPdf);
                    p2.scale(refW / p2.getWidth(), refH / p2.getHeight());
                    const p2Embed = await mergedPdf.embedPage(p2);
                    contentSheet.drawPage(p2Embed, { x: refW, y: 0, width: refW, height: refH });
                }
            }
            hasSelectedPages = true;

        } else {
            // CHẾ ĐỘ GỘP THÔNG THƯỜNG
            for (const pageDiv of allPageDivs) {
                const checkbox = pageDiv.querySelector('.page-checkbox');
                if (!checkbox.checked) continue;
                
                hasSelectedPages = true;
                const fileId = parseFloat(pageDiv.dataset.fileId);
                const pageNum = parseInt(pageDiv.dataset.pageNum);
                
                const fileData = files.find(f => f.id === fileId);
                if (!fileData) continue;
                
                const arrayBuffer = await fileData.file.arrayBuffer();
                const pdf = await PDFDocument.load(arrayBuffer);
                const [copiedPage] = await mergedPdf.copyPages(pdf, [pageNum - 1]);
                
                if (!referenceSize) {
                    referenceSize = { width: copiedPage.getWidth(), height: copiedPage.getHeight() };
                } else {
                    const { width, height } = referenceSize;
                    copiedPage.scale(width / copiedPage.getWidth(), height / copiedPage.getHeight());
                }
                mergedPdf.addPage(copiedPage);
            }
        }
        
        if (!hasSelectedPages) {
            alert('Vui lòng chọn ít nhất một trang!');
            return;
        }
        
        const mergedPdfBytes = await mergedPdf.save();
        
        // Lấy tên file từ input
        let fileName = outputFileName.value.trim();
        if (!fileName) {
            fileName = isBookletMode ? 'booklet_file' : 'merged_file';
        }
        // Loại bỏ .pdf nếu người dùng đã nhập
        fileName = fileName.replace(/\.pdf$/i, '');
        
        downloadFile(mergedPdfBytes, fileName + '.pdf');
        
        alert('Tải file thành công!');
        previewModal.classList.remove('show');
    } catch (error) {
        alert('Lỗi khi tạo file: ' + error.message);
    } finally {
        downloadPreviewBtn.disabled = false;
        downloadPreviewBtn.textContent = 'Tải Về File Đã Chọn';
    }
}

function downloadFile(pdfBytes, fileName) {
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
