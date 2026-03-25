// ===== CLIENT-SIDE JAVASCRIPT FOR BOOK NOTES APP =====

/**
 * Utility function to show confirmation dialog
 * Used before deleting books
 */
function confirmDelete(bookTitle) {
  return confirm(
    `Are you sure you want to delete "${bookTitle}"? This action cannot be undone.`,
  );
}

/**
 * Format a date string to a more readable format
 * Example: "2024-01-15" => "Jan 15, 2024"
 */
function formatDate(dateString) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

/**
 * Generate star rating HTML
 * Used for displaying ratings visually
 */
function generateStars(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    stars += `<span class="star ${i <= rating ? "filled" : ""}">★</span>`;
  }
  return stars;
}

/**
 * Change the sort order of books on the home page
 * Updates the URL with the sort parameter
 */
function changeSortBy(sortValue) {
  window.location.href = "/?sort=" + sortValue;
}

/**
 * Validate book form before submission
 * Ensures all required fields are filled
 */
function validateBookForm() {
  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const dateRead = document.getElementById("dateRead").value;
  const rating = document.querySelector('input[name="rating"]:checked');

  if (!title) {
    alert("Please enter a book title");
    return false;
  }

  if (!author) {
    alert("Please enter the author name");
    return false;
  }

  if (!dateRead) {
    alert("Please select a date when you read this book");
    return false;
  }

  if (!rating) {
    alert("Please select a rating (1-5 stars)");
    return false;
  }

  return true;
}

/**
 * Initialize form validation on page load
 */
document.addEventListener("DOMContentLoaded", function () {
  // Get the form if it exists (only on add/edit pages)
  const bookForm =
    document.getElementById("addBookForm") ||
    document.getElementById("editBookForm");

  if (bookForm) {
    bookForm.addEventListener("submit", function (e) {
      if (!validateBookForm()) {
        e.preventDefault();
      }
    });
  }

  // Add smooth scroll behavior
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Add keyboard shortcuts
  document.addEventListener("keydown", function (e) {
    // Press 'N' to go to new book page
    if (e.key === "N" || e.key === "n") {
      // Only if not typing in an input field
      if (
        document.activeElement.tagName !== "TEXTAREA" &&
        document.activeElement.tagName !== "INPUT"
      ) {
        window.location.href = "/new";
      }
    }

    // Press 'H' to go to home page
    if (e.key === "H" || e.key === "h") {
      if (
        document.activeElement.tagName !== "TEXTAREA" &&
        document.activeElement.tagName !== "INPUT"
      ) {
        window.location.href = "/";
      }
    }
  });
});

/**
 * Format review text with basic markdown-like formatting
 * Supports: **bold**, *italic*, `code`
 */
function formatReviewText(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`(.*?)`/g, "<code>$1</code>");
}

/**
 * Search functionality for books on the home page
 * Can be added to the home page for live filtering
 */
function searchBooks(keyword) {
  const cards = document.querySelectorAll(".book-card");
  const lowerKeyword = keyword.toLowerCase();

  cards.forEach((card) => {
    const title = card.querySelector(".book-title").textContent.toLowerCase();
    const author = card.querySelector(".book-author").textContent.toLowerCase();
    const review =
      card.querySelector(".book-review")?.textContent.toLowerCase() || "";

    if (
      title.includes(lowerKeyword) ||
      author.includes(lowerKeyword) ||
      review.includes(lowerKeyword)
    ) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
}

/**
 * Clear all form fields
 * Useful for the add book form
 */
function clearForm() {
  const inputs = document.querySelectorAll(
    '.form-input, .form-textarea, input[type="radio"]',
  );
  inputs.forEach((input) => {
    if (input.type === "radio") {
      input.checked = false;
    } else {
      input.value = "";
    }
  });
}

/**
 * Show a toast notification message
 * Can be used for success/error messages
 */
function showToast(message, type = "info", duration = 3000) {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === "success" ? "#06A77D" : type === "error" ? "#C73E1D" : "#2E86AB"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        font-weight: 500;
        animation: slideIn 0.3s ease;
    `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "slideOut 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/**
 * Animation styles for toast notifications
 * Added to head dynamically
 */
if (!document.querySelector("style[data-toast]")) {
  const style = document.createElement("style");
  style.setAttribute("data-toast", "true");
  style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(style);
}

/**
 * Calculate reading statistics
 * Can be displayed on the homepage
 */
function getReadingStats() {
  const cards = document.querySelectorAll(".book-card");
  const totalBooks = cards.length;

  let highestRated = null;
  let highestRating = 0;
  let totalRating = 0;

  cards.forEach((card) => {
    const ratingText = card.querySelector(".rating-text")?.textContent;
    const rating = parseInt(ratingText?.match(/\d+/)?.[0] || 0);

    totalRating += rating;
    if (rating > highestRating) {
      highestRating = rating;
      highestRated = card.querySelector(".book-title")?.textContent;
    }
  });

  return {
    totalBooks,
    averageRating: totalBooks > 0 ? (totalRating / totalBooks).toFixed(1) : 0,
    highestRated,
    highestRating,
  };
}

// ===== EXPORT FUNCTIONS FOR EXTERNAL USE =====
// The functions above are accessible globally
// No need to export anything as they're called directly from HTML
