let PDFDocument;
let files = [];
let draggedElement = null;
let selectedPages = new Map();

// Booklet functionality - Đơn giản hóa hoàn toàn
let bookletSlots = {
    front: null,
    back: null,
    content1: null,
    content2: null
};

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

function initializeApp() {
    const fileInput = document.getElementById('fileInput');
    const uploadLabel = document.querySelector('.upload-label');
    
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

    document.getElementById('mergeBtn').addEventListener('click', handleMerge);
    document.getElementById('splitBtn').addEventListener('click', handleSplit);
    document.getElementById('clearBtn').addEventListener('click', handleClear);
    document.getElementById('previewBtn').addEventListener('click', handlePreview);
    document.getElementById('bookletBtn').addEventListener('click', handleBooklet);

    // Modal events
    document.querySelector('.close-modal').addEventListener('click', () => {
        document.getElementById('previewModal').classList.remove('show');
    });

    document.getElementById('closePreviewBtn').addEventListener('click', () => {
        document.getElementById('previewModal').classList.remove('show');
    });

    document.getElementById('downloadPreviewBtn').addEventListener('click', handleDownloadPreview);

    // Booklet modal events
    document.querySelector('.close-booklet-modal').addEventListener('click', () => {
        document.getElementById('bookletModal').classList.remove('show');
    });

    document.getElementById('closeBookletBtn').addEventListener('click', () => {
        document.getElementById('bookletModal').classList.remove('show');
    });

    document.getElementById('createBookletBtn').addEventListener('click', handleCreateBooklet);
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
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = '';
    
    files.forEach((fileData, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <div class="file-header">
                <div class="file-number">${index + 1}</div>
                <button class="delete-btn" onclick="deleteFile(${fileData.id})">×</button>
            </div>
            <div class="file-name">${fileData.name}</div>
            <div class="file-info">${formatFileSize(fileData.size)}</div>
        `;
        fileList.appendChild(fileItem);
    });
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
    
    fileName = fileName.trim() || 'merged_file';
    fileName = fileName.replace(/\.pdf$/i, '');
    
    const btn = document.getElementById('mergeBtn');
    btn.disabled = true;
    btn.textContent = 'Đang xử lý...';
    
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
        btn.disabled = false;
        btn.textContent = 'Gộp File';
    }
}

// Tách file
async function handleSplit() {
    if (files.length === 0) {
        alert('Vui lòng chọn file PDF để tách!');
        return;
    }
    
    const btn = document.getElementById('splitBtn');
    btn.disabled = true;
    btn.textContent = 'Đang xử lý...';
    
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
        btn.disabled = false;
        btn.textContent = 'Tách File';
    }
}

function handleClear() {
    if (files.length === 0) return;
    if (confirm('Bạn có chắc muốn xóa tất cả file?')) {
        files = [];
        document.getElementById('fileInput').value = '';
        renderFileList();
    }
}

// Xem trước - Đơn giản hóa
async function handlePreview() {
    if (files.length === 0) {
        alert('Vui lòng chọn file PDF để xem trước!');
        return;
    }
    
    const btn = document.getElementById('previewBtn');
    btn.disabled = true;
    btn.textContent = 'Đang tải...';
    
    try {
        document.getElementById('previewModal').classList.add('show');
    } catch (error) {
        alert('Lỗi khi xem trước: ' + error.message);
    } finally {
        btn.disabled = false;
        btn.textContent = 'Xem Trước';
    }
}

async function handleDownloadPreview() {
    alert('Chức năng xem trước đang được đơn giản hóa. Vui lòng sử dụng chức năng gộp file thông thường.');
}

// BOOKLET - Đơn giản hóa tối đa
async function handleBooklet() {
    if (files.length === 0) {
        alert('Vui lòng chọn file PDF để tạo sổ!');
        return;
    }
    
    const btn = document.getElementById('bookletBtn');
    btn.disabled = true;
    btn.textContent = 'Đang tải...';
    
    try {
        // Reset slots
        bookletSlots = { front: null, back: null, content1: null, content2: null };
        
        // Render pages đơn giản
        await renderSimpleBookletPages();
        document.getElementById('bookletModal').classList.add('show');
    } catch (error) {
        alert('Lỗi khi tải trang: ' + error.message);
    } finally {
        btn.disabled = false;
        btn.textContent = 'Gộp Thành Sổ';
    }
}

async function renderSimpleBookletPages() {
    const container = document.getElementById('bookletPages');
    container.innerHTML = '';
    
    let pageIndex = 0;
    
    for (const fileData of files) {
        try {
            const arrayBuffer = await fileData.file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            
            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                const pageDiv = document.createElement('div');
                pageDiv.className = 'booklet-page';
                pageDiv.style.cssText = `
                    border: 2px solid #ddd;
                    border-radius: 8px;
                    padding: 10px;
                    margin: 5px;
                    background: white;
                    cursor: pointer;
                    text-align: center;
                    min-height: 100px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                `;
                
                pageDiv.innerHTML = `
                    <div style="font-weight: bold; margin-bottom: 5px;">${fileData.name}</div>
                    <div>Trang ${pageNum}</div>
                    <div style="font-size: 12px; color: #666; margin-top: 5px;">Nhấn để chọn</div>
                `;
                
                pageDiv.onclick = () => selectPageForBooklet(pageDiv, fileData, pageNum);
                
                container.appendChild(pageDiv);
                pageIndex++;
            }
        } catch (error) {
            console.error('Lỗi render trang:', error);
        }
    }
    
    // Hiển thị slots
    updateBookletSlots();
}

function selectPageForBooklet(pageDiv, fileData, pageNum) {
    const slotTypes = ['front', 'back', 'content1', 'content2'];
    const slotNames = ['Trang Đầu', 'Trang Cuối', 'Nội dung 1', 'Nội dung 2'];
    
    let message = 'Chọn vị trí cho trang này:\n';
    slotTypes.forEach((type, index) => {
        const status = bookletSlots[type] ? ' (Đã có)' : ' (Trống)';
        message += `${index + 1}. ${slotNames[index]}${status}\n`;
    });
    
    const choice = prompt(message + '\nNhập số (1-4):');
    const choiceIndex = parseInt(choice) - 1;
    
    if (choiceIndex >= 0 && choiceIndex < 4) {
        const slotType = slotTypes[choiceIndex];
        bookletSlots[slotType] = { fileData, pageNum };
        
        pageDiv.style.backgroundColor = '#e8f5e8';
        pageDiv.innerHTML += `<div style="color: green; font-weight: bold; margin-top: 5px;">→ ${slotNames[choiceIndex]}</div>`;
        
        updateBookletSlots();
    }
}

function updateBookletSlots() {
    const slotElements = {
        front: document.getElementById('frontPage'),
        back: document.getElementById('backPage'),
        content1: document.getElementById('content1Page'),
        content2: document.getElementById('content2Page')
    };
    
    Object.keys(bookletSlots).forEach(slotType => {
        const slot = slotElements[slotType];
        if (!slot) return;
        
        if (bookletSlots[slotType]) {
            const data = bookletSlots[slotType];
            slot.innerHTML = `
                <div style="text-align: center; padding: 10px;">
                    <div style="font-weight: bold;">${data.fileData.name}</div>
                    <div>Trang ${data.pageNum}</div>
                    <button onclick="removeFromBookletSlot('${slotType}')" style="margin-top: 5px; background: red; color: white; border: none; border-radius: 3px; padding: 2px 8px;">Xóa</button>
                </div>
            `;
            slot.style.backgroundColor = '#e8f5e8';
            slot.classList.add('filled');
        } else {
            slot.innerHTML = '<div class="slot-placeholder">Kéo trang vào đây</div>';
            slot.style.backgroundColor = '#fafafa';
            slot.classList.remove('filled');
        }
    });
}

function removeFromBookletSlot(slotType) {
    bookletSlots[slotType] = null;
    updateBookletSlots();
    
    // Cập nhật lại màu của các trang
    renderSimpleBookletPages();
}

async function handleCreateBooklet() {
    const requiredSlots = ['front', 'back', 'content1', 'content2'];
    const missingSlots = requiredSlots.filter(slot => !bookletSlots[slot]);
    
    if (missingSlots.length > 0) {
        alert(`Vui lòng chọn đủ 4 trang! Còn thiếu: ${missingSlots.join(', ')}`);
        return;
    }
    
    const btn = document.getElementById('createBookletBtn');
    btn.disabled = true;
    btn.textContent = 'Đang tạo...';
    
    try {
        const bookletPdf = await PDFDocument.create();
        
        // Tạo 2 trang booklet
        await addSimpleBookletPage(bookletPdf, bookletSlots.front, bookletSlots.back);
        await addSimpleBookletPage(bookletPdf, bookletSlots.content2, bookletSlots.content1);
        
        const bookletPdfBytes = await bookletPdf.save();
        
        let fileName = document.getElementById('bookletFileName').value.trim() || 'booklet';
        fileName = fileName.replace(/\.pdf$/i, '');
        
        downloadFile(bookletPdfBytes, fileName + '.pdf');
        
        alert('Tạo sổ thành công! Hãy in 2 mặt và gấp đôi để có sổ hoàn chỉnh.');
        document.getElementById('bookletModal').classList.remove('show');
        
    } catch (error) {
        alert('Lỗi khi tạo sổ: ' + error.message);
    } finally {
        btn.disabled = false;
        btn.textContent = 'Tạo Sổ';
    }
}

async function addSimpleBookletPage(bookletPdf, leftPageData, rightPageData) {
    const leftFile = leftPageData.fileData;
    const rightFile = rightPageData.fileData;
    
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