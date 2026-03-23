let PDFDocument;
let files = [];
let draggedElement = null;
let selectedPages = new Map(); // Map để lưu các trang được chọn

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
const splitBtn = document.getElementById('splitBtn');
const bookletBtn = document.getElementById('bookletBtn');
const previewBtn = document.getElementById('previewBtn');
const clearBtn = document.getElementById('clearBtn');
const uploadLabel = document.querySelector('.upload-label');
const previewModal = document.getElementById('previewModal');
const closeModalBtn = document.querySelector('.close-modal');
const closePreviewBtn = document.getElementById('closePreviewBtn');
const downloadPreviewBtn = document.getElementById('downloadPreviewBtn');
const previewContainer = document.getElementById('previewContainer');
const outputFileName = document.getElementById('outputFileName');

// Booklet elements
const bookletModal = document.getElementById('bookletModal');
const closeBookletModalBtn = document.querySelector('.close-booklet-modal');
const closeBookletBtn = document.getElementById('closeBookletBtn');
const createBookletBtn = document.getElementById('createBookletBtn');
const bookletContainer = document.getElementById('bookletContainer');
const bookletPages = document.getElementById('bookletPages');
const bookletFileName = document.getElementById('bookletFileName');
const autoArrangeBtn = document.getElementById('autoArrangeBtn');
const clearAllSlotsBtn = document.getElementById('clearAllSlotsBtn');

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

    // Tách file
    splitBtn.addEventListener('click', handleSplit);

    // Xóa tất cả
    clearBtn.addEventListener('click', handleClear);

    // Xem trước
    previewBtn.addEventListener('click', handlePreview);

    // Gộp thành sổ
    bookletBtn.addEventListener('click', handleBooklet);

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

    // Booklet modal events
    closeBookletModalBtn.addEventListener('click', () => {
        bookletModal.classList.remove('show');
    });

    closeBookletBtn.addEventListener('click', () => {
        bookletModal.classList.remove('show');
    });

    bookletModal.addEventListener('click', (e) => {
        if (e.target === bookletModal) {
            bookletModal.classList.remove('show');
        }
    });

    createBookletBtn.addEventListener('click', handleCreateBooklet);

    // Auto arrange và clear slots
    autoArrangeBtn.addEventListener('click', handleAutoArrange);
    clearAllSlotsBtn.addEventListener('click', handleClearAllSlots);
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
            size: file.size
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

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Gộp file
async function handleMerge() {
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

// Tách file
async function handleSplit() {
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
        renderFileList();
    }
}

// Xem trước
async function handlePreview() {
    if (files.length === 0) {
        alert('Vui lòng chọn file PDF để xem trước!');
        return;
    }
    
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
    
    for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
        const fileData = files[fileIndex];
        
        // Tạo section cho mỗi file
        const fileSection = document.createElement('div');
        fileSection.className = 'preview-file-section';
        
        const fileTitle = document.createElement('div');
        fileTitle.className = 'preview-file-title';
        fileTitle.textContent = `${fileIndex + 1}. ${fileData.name}`;
        fileSection.appendChild(fileTitle);
        
        const pagesContainer = document.createElement('div');
        pagesContainer.className = 'preview-container';
        
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
            pageNumber.textContent = `Trang ${pageNum}`;
            
            pageDiv.appendChild(dragHandle);
            pageDiv.appendChild(checkbox);
            pageDiv.appendChild(canvas);
            pageDiv.appendChild(pageNumber);
            
            pageDiv.addEventListener('click', (e) => {
                if (!e.target.classList.contains('page-checkbox') && !e.target.classList.contains('page-drag-handle')) {
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
            
            pagesContainer.appendChild(pageDiv);
        }
        
        fileSection.appendChild(pagesContainer);
        previewContainer.appendChild(fileSection);
    }
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
        const allPageDivs = document.querySelectorAll('.preview-page');
        
        if (allPageDivs.length === 0) {
            alert('Không có trang nào để tải!');
            return;
        }
        
        let hasSelectedPages = false;
        
        for (const pageDiv of allPageDivs) {
            const checkbox = pageDiv.querySelector('.page-checkbox');
            
            // Chỉ xử lý các trang được chọn
            if (!checkbox.checked) continue;
            
            hasSelectedPages = true;
            
            const fileId = parseFloat(pageDiv.dataset.fileId);
            const pageNum = parseInt(pageDiv.dataset.pageNum);
            
            // Tìm file tương ứng
            const fileData = files.find(f => f.id === fileId);
            if (!fileData) continue;
            
            const arrayBuffer = await fileData.file.arrayBuffer();
            const pdf = await PDFDocument.load(arrayBuffer);
            
            const [copiedPage] = await mergedPdf.copyPages(pdf, [pageNum - 1]);
            mergedPdf.addPage(copiedPage);
        }
        
        if (!hasSelectedPages) {
            alert('Vui lòng chọn ít nhất một trang!');
            return;
        }
        
        const mergedPdfBytes = await mergedPdf.save();
        
        // Lấy tên file từ input
        let fileName = outputFileName.value.trim();
        if (!fileName) {
            fileName = 'merged_file';
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

// Booklet functionality
let bookletSlots = {
    front: null,
    back: null,
    content1: null,
    content2: null
};

// Xử lý gộp thành sổ
async function handleBooklet() {
    if (files.length === 0) {
        alert('Vui lòng chọn file PDF để tạo sổ!');
        return;
    }
    
    // Kiểm tra thư viện đã load chưa
    if (typeof pdfjsLib === 'undefined') {
        alert('Thư viện PDF.js chưa được tải. Vui lòng thử lại sau!');
        return;
    }
    
    bookletBtn.disabled = true;
    bookletBtn.textContent = 'Đang tải...';
    
    try {
        // Reset booklet slots
        bookletSlots = {
            front: null,
            back: null,
            content1: null,
            content2: null
        };
        
        await renderBookletPages();
        bookletModal.classList.add('show');
    } catch (error) {
        console.error('Lỗi khi tải trang:', error);
        alert('Lỗi khi tải trang: ' + error.message);
    } finally {
        bookletBtn.disabled = false;
        bookletBtn.textContent = 'Gộp Thành Sổ';
    }
}

// Render các trang cho booklet
async function renderBookletPages() {
    bookletPages.innerHTML = '';
    
    try {
        for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
            const fileData = files[fileIndex];
            
            const arrayBuffer = await fileData.file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            
            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                try {
                    const page = await pdf.getPage(pageNum);
                    const viewport = page.getViewport({ scale: 0.3 });
                    
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
                    
                    await page.render({
                        canvasContext: context,
                        viewport: viewport
                    }).promise;
                    
                    const pageDiv = document.createElement('div');
                    pageDiv.className = 'booklet-page';
                    pageDiv.draggable = true;
                    pageDiv.dataset.fileId = fileData.id;
                    pageDiv.dataset.pageNum = pageNum;
                    pageDiv.dataset.fileName = fileData.name;
                    
                    const pageInfo = document.createElement('div');
                    pageInfo.className = 'booklet-page-info';
                    pageInfo.textContent = `${fileData.name} - Trang ${pageNum}`;
                    
                    pageDiv.appendChild(canvas);
                    pageDiv.appendChild(pageInfo);
                    
                    // Thêm sự kiện kéo thả
                    pageDiv.addEventListener('dragstart', handleBookletPageDragStart);
                    pageDiv.addEventListener('dragend', handleBookletPageDragEnd);
                    
                    bookletPages.appendChild(pageDiv);
                } catch (pageError) {
                    console.error(`Lỗi khi render trang ${pageNum}:`, pageError);
                }
            }
        }
        
        // Thiết lập drop zones
        setupBookletDropZones();
    } catch (error) {
        console.error('Lỗi khi render booklet pages:', error);
        throw error;
    }
}

// Thiết lập các vùng thả cho booklet
function setupBookletDropZones() {
    const slots = document.querySelectorAll('.booklet-slot');
    
    slots.forEach(slot => {
        slot.addEventListener('dragover', handleBookletSlotDragOver);
        slot.addEventListener('drop', handleBookletSlotDrop);
        slot.addEventListener('dragenter', handleBookletSlotDragEnter);
        slot.addEventListener('dragleave', handleBookletSlotDragLeave);
    });
}

let draggedBookletPage = null;

function handleBookletPageDragStart(e) {
    draggedBookletPage = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('text/plain', ''); // Thêm dữ liệu để tránh lỗi
}

function handleBookletPageDragEnd() {
    this.classList.remove('dragging');
    document.querySelectorAll('.booklet-slot').forEach(slot => {
        slot.classList.remove('drag-over');
    });
}

function handleBookletSlotDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'copy';
    return false;
}

function handleBookletSlotDragEnter() {
    this.classList.add('drag-over');
}

function handleBookletSlotDragLeave() {
    this.classList.remove('drag-over');
}

function handleBookletSlotDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    
    this.classList.remove('drag-over');
    
    if (draggedBookletPage) {
        try {
            const slotType = this.dataset.type;
            const fileId = parseFloat(draggedBookletPage.dataset.fileId);
            const pageNum = parseInt(draggedBookletPage.dataset.pageNum);
            const fileName = draggedBookletPage.dataset.fileName;
            
            // Lấy canvas gốc
            const originalCanvas = draggedBookletPage.querySelector('canvas');
            
            if (!originalCanvas) {
                console.error('Không tìm thấy canvas trong trang được kéo');
                return false;
            }
            
            // Lưu thông tin trang vào slot
            bookletSlots[slotType] = {
                fileId: fileId,
                pageNum: pageNum,
                fileName: fileName,
                canvas: originalCanvas
            };
            
            // Hiển thị trang trong slot
            displayPageInSlot(this, bookletSlots[slotType]);
        } catch (error) {
            console.error('Lỗi khi thả trang vào slot:', error);
            alert('Có lỗi xảy ra khi thêm trang vào slot!');
        }
    }
    
    return false;
}

function displayPageInSlot(slot, pageData) {
    if (!slot || !pageData || !pageData.canvas) {
        console.error('Invalid slot or pageData:', slot, pageData);
        return;
    }
    
    slot.innerHTML = '';
    slot.classList.add('filled');
    
    const content = document.createElement('div');
    content.className = 'booklet-slot-content';
    
    try {
        // Tạo canvas mới thay vì clone để tránh lỗi
        const canvas = document.createElement('canvas');
        const originalCanvas = pageData.canvas;
        
        if (!originalCanvas || !originalCanvas.getContext) {
            console.error('Invalid canvas:', originalCanvas);
            return;
        }
        
        canvas.width = originalCanvas.width;
        canvas.height = originalCanvas.height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(originalCanvas, 0, 0);
        
        const info = document.createElement('div');
        info.className = 'booklet-slot-info';
        info.textContent = `${pageData.fileName} - Trang ${pageData.pageNum}`;
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-from-slot';
        removeBtn.textContent = '×';
        removeBtn.addEventListener('click', () => {
            removeFromSlot(slot);
        });
        
        const swapBtn = document.createElement('button');
        swapBtn.className = 'booklet-slot-swap';
        swapBtn.textContent = '⇄';
        swapBtn.title = 'Hoán đổi với slot khác';
        swapBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            handleSwapSlot(slot.dataset.type);
        });
        
        content.appendChild(canvas);
        content.appendChild(info);
        slot.appendChild(content);
        slot.appendChild(removeBtn);
        slot.appendChild(swapBtn);
    } catch (error) {
        console.error('Lỗi khi hiển thị trang trong slot:', error);
        slot.innerHTML = '<div class="slot-placeholder">Lỗi hiển thị trang</div>';
    }
}

function removeFromSlot(slot) {
    const slotType = slot.dataset.type;
    bookletSlots[slotType] = null;
    
    slot.classList.remove('filled');
    slot.innerHTML = '<div class="slot-placeholder">Kéo trang vào đây</div>';
}

// Tạo sổ
async function handleCreateBooklet() {
    // Kiểm tra đã chọn đủ 4 trang chưa
    const requiredSlots = ['front', 'back', 'content1', 'content2'];
    const missingSlots = requiredSlots.filter(slot => !bookletSlots[slot]);
    
    if (missingSlots.length > 0) {
        alert('Vui lòng chọn đủ 4 trang cho sổ!');
        return;
    }
    
    createBookletBtn.disabled = true;
    createBookletBtn.textContent = 'Đang tạo...';
    
    try {
        const bookletPdf = await PDFDocument.create();
        
        // Tạo trang 1: Trang đầu + Trang cuối (cạnh nhau)
        await addBookletPage(bookletPdf, bookletSlots.front, bookletSlots.back);
        
        // Tạo trang 2: Nội dung 2 + Nội dung 1 (cạnh nhau, đảo ngược để khi gấp đúng thứ tự)
        await addBookletPage(bookletPdf, bookletSlots.content2, bookletSlots.content1);
        
        const bookletPdfBytes = await bookletPdf.save();
        
        // Lấy tên file
        let fileName = bookletFileName.value.trim();
        if (!fileName) {
            fileName = 'booklet';
        }
        fileName = fileName.replace(/\.pdf$/i, '');
        
        downloadFile(bookletPdfBytes, fileName + '.pdf');
        
        alert('Tạo sổ thành công! Hãy in 2 mặt và gấp đôi để có sổ hoàn chỉnh.');
        bookletModal.classList.remove('show');
        
    } catch (error) {
        alert('Lỗi khi tạo sổ: ' + error.message);
    } finally {
        createBookletBtn.disabled = false;
        createBookletBtn.textContent = 'Tạo Sổ';
    }
}

// Thêm trang booklet (2 trang cạnh nhau)
async function addBookletPage(bookletPdf, leftPageData, rightPageData) {
    // Lấy trang gốc để copy
    const leftFile = files.find(f => f.id === leftPageData.fileId);
    const rightFile = files.find(f => f.id === rightPageData.fileId);
    
    const leftArrayBuffer = await leftFile.file.arrayBuffer();
    const rightArrayBuffer = await rightFile.file.arrayBuffer();
    
    const leftPdf = await PDFDocument.load(leftArrayBuffer);
    const rightPdf = await PDFDocument.load(rightArrayBuffer);
    
    // Copy các trang
    const [leftPage] = await bookletPdf.copyPages(leftPdf, [leftPageData.pageNum - 1]);
    const [rightPage] = await bookletPdf.copyPages(rightPdf, [rightPageData.pageNum - 1]);
    
    // Tạo trang mới với kích thước A4 ngang (landscape)
    const page = bookletPdf.addPage([842, 595]); // A4 landscape
    
    // Lấy kích thước trang gốc
    const leftSize = leftPage.getSize();
    const rightSize = rightPage.getSize();
    
    // Tính toán scale để fit vào nửa trang
    const maxWidth = 421; // Nửa chiều rộng A4 landscape
    const maxHeight = 595; // Chiều cao A4
    
    const leftScale = Math.min(maxWidth / leftSize.width, maxHeight / leftSize.height);
    const rightScale = Math.min(maxWidth / rightSize.width, maxHeight / rightSize.height);
    
    // Tính toán vị trí để căn giữa
    const leftWidth = leftSize.width * leftScale;
    const leftHeight = leftSize.height * leftScale;
    const rightWidth = rightSize.width * rightScale;
    const rightHeight = rightSize.height * rightScale;
    
    const leftX = (maxWidth - leftWidth) / 2;
    const leftY = (maxHeight - leftHeight) / 2;
    const rightX = maxWidth + (maxWidth - rightWidth) / 2;
    const rightY = (maxHeight - rightHeight) / 2;
    
    // Vẽ các trang
    page.drawPage(leftPage, {
        x: leftX,
        y: leftY,
        width: leftWidth,
        height: leftHeight
    });
    
    page.drawPage(rightPage, {
        x: rightX,
        y: rightY,
        width: rightWidth,
        height: rightHeight
    });
}
// Sắp xếp tự động
function handleAutoArrange() {
    const allPages = document.querySelectorAll('.booklet-page');
    
    if (allPages.length < 4) {
        alert('Cần ít nhất 4 trang để sắp xếp tự động!');
        return;
    }
    
    try {
        // Xóa tất cả slot hiện tại
        handleClearAllSlots();
        
        // Sắp xếp theo thứ tự: trang 1 -> đầu, trang 2 -> nội dung 1, trang 3 -> nội dung 2, trang 4 -> cuối
        const slotOrder = ['front', 'content1', 'content2', 'back'];
        
        for (let i = 0; i < Math.min(4, allPages.length); i++) {
            const page = allPages[i];
            const slotType = slotOrder[i];
            const slot = document.querySelector(`[data-type="${slotType}"]`);
            
            if (!page || !slot) continue;
            
            const fileId = parseFloat(page.dataset.fileId);
            const pageNum = parseInt(page.dataset.pageNum);
            const fileName = page.dataset.fileName;
            const canvas = page.querySelector('canvas');
            
            if (!canvas) {
                console.error('Không tìm thấy canvas cho trang:', page);
                continue;
            }
            
            bookletSlots[slotType] = {
                fileId: fileId,
                pageNum: pageNum,
                fileName: fileName,
                canvas: canvas
            };
            
            displayPageInSlot(slot, bookletSlots[slotType]);
        }
        
        alert('Đã sắp xếp tự động 4 trang đầu tiên!');
    } catch (error) {
        console.error('Lỗi khi sắp xếp tự động:', error);
        alert('Có lỗi xảy ra khi sắp xếp tự động!');
    }
}

// Xóa tất cả slots
function handleClearAllSlots() {
    const slots = document.querySelectorAll('.booklet-slot');
    slots.forEach(slot => {
        removeFromSlot(slot);
    });
}

// Thêm nút swap cho các slot
function addSwapButton(slot, slotType) {
    const swapBtn = document.createElement('button');
    swapBtn.className = 'booklet-slot-swap';
    swapBtn.textContent = '⇄';
    swapBtn.title = 'Hoán đổi với slot khác';
    swapBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        handleSwapSlot(slotType);
    });
    
    slot.appendChild(swapBtn);
}

// Hoán đổi slot
function handleSwapSlot(currentSlotType) {
    const otherSlots = Object.keys(bookletSlots).filter(type => 
        type !== currentSlotType && bookletSlots[type] !== null
    );
    
    if (otherSlots.length === 0) {
        alert('Không có slot nào khác để hoán đổi!');
        return;
    }
    
    // Tạo menu chọn slot để hoán đổi
    const slotNames = {
        front: 'Trang Đầu',
        back: 'Trang Cuối', 
        content1: 'Nội dung 1',
        content2: 'Nội dung 2'
    };
    
    let message = 'Chọn slot để hoán đổi:\n';
    otherSlots.forEach((slot, index) => {
        message += `${index + 1}. ${slotNames[slot]}\n`;
    });
    
    const choice = prompt(message + '\nNhập số thứ tự:');
    const choiceIndex = parseInt(choice) - 1;
    
    if (choiceIndex >= 0 && choiceIndex < otherSlots.length) {
        const targetSlotType = otherSlots[choiceIndex];
        
        // Hoán đổi dữ liệu
        const temp = bookletSlots[currentSlotType];
        bookletSlots[currentSlotType] = bookletSlots[targetSlotType];
        bookletSlots[targetSlotType] = temp;
        
        // Cập nhật hiển thị
        const currentSlot = document.querySelector(`[data-type="${currentSlotType}"]`);
        const targetSlot = document.querySelector(`[data-type="${targetSlotType}"]`);
        
        displayPageInSlot(currentSlot, bookletSlots[currentSlotType]);
        displayPageInSlot(targetSlot, bookletSlots[targetSlotType]);
        
        alert('Hoán đổi thành công!');
    }
}