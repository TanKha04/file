let PDFDocument;
let files = [];
let draggedElement = null;
let selectedPages = new Map();

// Booklet functionality
let bookletSlots = {
    front: null,
    back: null,
    content1: null,
    content2: null
};
let allBookletPages = [];

// Đợi thư viện load xong
window.addEventListener('DOMContentLoaded', () => {
    if (typeof PDFLib !== 'undefined') {
        PDFDocument = PDFLib.PDFDocument;
    }
    
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

function initializeApp() {
    fileInput.addEventListener('change', handleFileSelect);

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

    mergeBtn.addEventListener('click', handleMerge);
    splitBtn.addEventListener('click', handleSplit);
    clearBtn.addEventListener('click', handleClear);
    previewBtn.addEventListener('click', handlePreview);
    bookletBtn.addEventListener('click', handleBooklet);

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
    
    let fileName = prompt('Nhập tên file (không cần .pdf):', 'merged_file');
    if (fileName === null) return;
    
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

async function renderPreview() {
    previewContainer.innerHTML = '';
    selectedPages.clear();
    
    for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
        const fileData = files[fileIndex];
        
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

async function handleDownloadPreview() {
    downloadPreviewBtn.disabled = true;
    downloadPreviewBtn.textContent = 'Đang xử lý...';
    
    try {
        const mergedPdf = await PDFDocument.create();
        const allPageDivs = document.querySelectorAll('.preview-page');
        
        if (allPageDivs.length === 0) {
            alert('Không có trang nào để tải!');
            return;
        }
        
        let hasSelectedPages = false;
        
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
            mergedPdf.addPage(copiedPage);
        }
        
        if (!hasSelectedPages) {
            alert('Vui lòng chọn ít nhất một trang!');
            return;
        }
        
        const mergedPdfBytes = await mergedPdf.save();
        
        let fileName = outputFileName.value.trim();
        if (!fileName) {
            fileName = 'merged_file';
        }
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

// BOOKLET FUNCTIONALITY - Viết lại hoàn toàn
async function handleBooklet() {
    if (files.length === 0) {
        alert('Vui lòng chọn file PDF để tạo sổ!');
        return;
    }
    
    if (typeof pdfjsLib === 'undefined') {
        alert('Thư viện PDF.js chưa được tải. Vui lòng thử lại sau!');
        return;
    }
    
    bookletBtn.disabled = true;
    bookletBtn.textContent = 'Đang tải...';
    
    try {
        bookletSlots = { front: null, back: null, content1: null, content2: null };
        allBookletPages = [];
        
        await renderBookletPages();
        bookletModal.classList.add('show');
    } catch (error) {
        console.error('Lỗi:', error);
        alert('Lỗi khi tải trang. Vui lòng thử lại!');
    } finally {
        bookletBtn.disabled = false;
        bookletBtn.textContent = 'Gộp Thành Sổ';
    }
}

async function renderBookletPages() {
    const container = bookletPages;
    container.innerHTML = '<div style="text-align: center; padding: 20px;">Đang tải các trang...</div>';
    
    try {
        for (const fileData of files) {
            const arrayBuffer = await fileData.file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            
            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                const page = await pdf.getPage(pageNum);
                const viewport = page.getViewport({ scale: 0.3 });
                
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                
                await page.render({ canvasContext: context, viewport: viewport }).promise;
                
                allBookletPages.push({
                    fileId: fileData.id,
                    pageNum: pageNum,
                    fileName: fileData.name,
                    imageData: canvas.toDataURL()
                });
            }
        }
        
        displayBookletPages();
        setupBookletDropZones();
    } catch (error) {
        container.innerHTML = '<div style="text-align: center; padding: 20px; color: red;">Lỗi khi tải trang PDF</div>';
        throw error;
    }
}

function displayBookletPages() {
    const container = bookletPages;
    container.innerHTML = '';
    
    allBookletPages.forEach((pageInfo, index) => {
        const pageDiv = document.createElement('div');
        pageDiv.className = 'booklet-page';
        pageDiv.draggable = true;
        pageDiv.dataset.pageIndex = index;
        
        const img = document.createElement('img');
        img.src = pageInfo.imageData;
        img.style.width = '100%';
        img.style.height = 'auto';
        img.style.borderRadius = '4px';
        
        const pageInfoDiv = document.createElement('div');
        pageInfoDiv.className = 'booklet-page-info';
        pageInfoDiv.textContent = `${pageInfo.fileName} - Trang ${pageInfo.pageNum}`;
        
        pageDiv.appendChild(img);
        pageDiv.appendChild(pageInfoDiv);
        
        pageDiv.ondragstart = function(e) {
            e.dataTransfer.setData('text/plain', index);
            this.classList.add('dragging');
        };
        
        pageDiv.ondragend = function() {
            this.classList.remove('dragging');
            document.querySelectorAll('.booklet-slot').forEach(slot => {
                slot.classList.remove('drag-over');
            });
        };
        
        container.appendChild(pageDiv);
    });
}

function setupBookletDropZones() {
    document.querySelectorAll('.booklet-slot').forEach(slot => {
        slot.ondragover = function(e) {
            e.preventDefault();
            return false;
        };
        
        slot.ondragenter = function(e) {
            e.preventDefault();
            this.classList.add('drag-over');
        };
        
        slot.ondragleave = function(e) {
            if (!this.contains(e.relatedTarget)) {
                this.classList.remove('drag-over');
            }
        };
        
        slot.ondrop = function(e) {
            e.preventDefault();
            this.classList.remove('drag-over');
            
            const pageIndex = parseInt(e.dataTransfer.getData('text/plain'));
            const pageInfo = allBookletPages[pageIndex];
            
            if (pageInfo) {
                const slotType = this.dataset.type;
                bookletSlots[slotType] = pageInfo;
                displayPageInSlot(this, pageInfo);
            }
            
            return false;
        };
    });
}

function displayPageInSlot(slot, pageInfo) {
    slot.innerHTML = '';
    slot.classList.add('filled');
    
    const content = document.createElement('div');
    content.className = 'booklet-slot-content';
    
    const img = document.createElement('img');
    img.src = pageInfo.imageData;
    img.style.maxWidth = '100%';
    img.style.maxHeight = '150px';
    img.style.borderRadius = '4px';
    img.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    
    const info = document.createElement('div');
    info.className = 'booklet-slot-info';
    info.textContent = `${pageInfo.fileName} - Trang ${pageInfo.pageNum}`;
    
    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-from-slot';
    removeBtn.textContent = '×';
    removeBtn.onclick = () => {
        const slotType = slot.dataset.type;
        bookletSlots[slotType] = null;
        slot.classList.remove('filled');
        slot.innerHTML = '<div class="slot-placeholder">Kéo trang vào đây</div>';
    };
    
    content.appendChild(img);
    content.appendChild(info);
    slot.appendChild(content);
    slot.appendChild(removeBtn);
}

async function handleCreateBooklet() {
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
        
        await addBookletPage(bookletPdf, bookletSlots.front, bookletSlots.back);
        await addBookletPage(bookletPdf, bookletSlots.content2, bookletSlots.content1);
        
        const bookletPdfBytes = await bookletPdf.save();
        
        let fileName = bookletFileName.value.trim();
        if (!fileName) fileName = 'booklet';
        fileName = fileName.replace(/\.pdf$/i, '');
        
        downloadFile(bookletPdfBytes, fileName + '.pdf');
        
        alert('Tạo sổ thành công! Hãy in 2 mặt và gấp đôi để có sổ hoàn chỉnh.');
        bookletModal.classList.remove('show');
        
    } catch (error) {
        console.error('Lỗi khi tạo sổ:', error);
        alert('Lỗi khi tạo sổ: ' + error.message);
    } finally {
        createBookletBtn.disabled = false;
        createBookletBtn.textContent = 'Tạo Sổ';
    }
}

async function addBookletPage(bookletPdf, leftPageData, rightPageData) {
    const leftFile = files.find(f => f.id === leftPageData.fileId);
    const rightFile = files.find(f => f.id === rightPageData.fileId);
    
    const leftArrayBuffer = await leftFile.file.arrayBuffer();
    const rightArrayBuffer = await rightFile.file.arrayBuffer();
    
    const leftPdf = await PDFDocument.load(leftArrayBuffer);
    const rightPdf = await PDFDocument.load(rightArrayBuffer);
    
    const [leftPage] = await bookletPdf.copyPages(leftPdf, [leftPageData.pageNum - 1]);
    const [rightPage] = await bookletPdf.copyPages(rightPdf, [rightPageData.pageNum - 1]);
    
    const page = bookletPdf.addPage([842, 595]); // A4 landscape
    
    const leftSize = leftPage.getSize();
    const rightSize = rightPage.getSize();
    
    const maxWidth = 421;
    const maxHeight = 595;
    
    const leftScale = Math.min(maxWidth / leftSize.width, maxHeight / leftSize.height);
    const rightScale = Math.min(maxWidth / rightSize.width, maxHeight / rightSize.height);
    
    const leftWidth = leftSize.width * leftScale;
    const leftHeight = leftSize.height * leftScale;
    const rightWidth = rightSize.width * rightScale;
    const rightHeight = rightSize.height * rightScale;
    
    const leftX = (maxWidth - leftWidth) / 2;
    const leftY = (maxHeight - leftHeight) / 2;
    const rightX = maxWidth + (maxWidth - rightWidth) / 2;
    const rightY = (maxHeight - rightHeight) / 2;
    
    page.drawPage(leftPage, { x: leftX, y: leftY, width: leftWidth, height: leftHeight });
    page.drawPage(rightPage, { x: rightX, y: rightY, width: rightWidth, height: rightHeight });
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