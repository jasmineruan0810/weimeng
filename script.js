// ==========================================
// 1. 平滑捲動 (Smooth Scroll for Anchor Links)
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    const targetId = this.getAttribute("href");
    
    // 防呆：如果只是單純的 "#" 就不執行捲動，避免找不到節點報錯
    if (targetId === "#") return; 

    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault(); // 確定有找到目標元素，才阻斷預設跳轉行為
      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});

// ==========================================
// 2. 專案圖片燈箱效果 (Image Lightbox Modal)
// ==========================================
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".close-btn");
const viewButtons = document.querySelectorAll(".view-project-btn");

// 開啟 Modal 的函式
function openModal(imageSrc) {
  modalImg.src = imageSrc; 
  modal.style.display = "flex"; 
  document.body.style.overflow = "hidden"; // 優化：開啟大圖時，鎖定網頁背景防止滾動
}

// 關閉 Modal 的函式
function closeModal() {
  modal.style.style.display = "none";
  document.body.style.overflow = ""; // 優化：關閉大圖時，恢復網頁背景滾動
}

// 綁定所有專案按鈕
viewButtons.forEach(button => {
  button.addEventListener("click", function(event) {
    event.preventDefault(); 
    const imageSrc = this.getAttribute("data-image"); 
    if (imageSrc) {
      openModal(imageSrc);
    }
  });
});

// 點擊 X 按鈕關閉
closeBtn.addEventListener("click", closeModal);

// 點擊 Modal 黑色遮罩區域關閉
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

// 優化：按下鍵盤 Esc 鍵也能關閉 Modal
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.style.display === "flex") {
    closeModal();
  }
});
