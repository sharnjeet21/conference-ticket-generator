// Conference Ticket Generator
class TicketGenerator {
  constructor() {
    this.form = document.getElementById('ticket-form');
    this.formSection = document.getElementById('form-section');
    this.confirmationSection = document.getElementById('confirmation-section');
    this.avatarUpload = document.getElementById('avatar-upload');
    this.uploadArea = document.getElementById('upload-area');
    this.uploadPreview = document.getElementById('upload-preview');
    this.previewImage = document.getElementById('preview-image');
    this.removeImageBtn = document.getElementById('remove-image');
    this.changeImageBtn = document.getElementById('change-image');
    
    // Ticket action buttons
    this.downloadBtn = document.getElementById('download-ticket');
    this.shareBtn = document.getElementById('share-ticket');
    this.printBtn = document.getElementById('print-ticket');
    this.createAnotherBtn = document.getElementById('create-another');
    this.generatedTicket = document.getElementById('generated-ticket');
    
    this.uploadedImageData = null;
    this.currentTicketData = null;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupFileUpload();
  }

  setupEventListeners() {
    // Form submission
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    
    // Real-time validation
    const inputs = this.form.querySelectorAll('input[type="text"], input[type="email"]');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearError(input));
    });

    // Remove image button
    this.removeImageBtn.addEventListener('click', () => this.removeImage());
    
    // Change image button
    this.changeImageBtn.addEventListener('click', () => this.changeImage());
    
    // Ticket action buttons
    this.setupTicketActions();
  }

  setupTicketActions() {
    // Download ticket
    this.downloadBtn?.addEventListener('click', () => this.downloadTicket());
    
    // Share ticket
    this.shareBtn?.addEventListener('click', () => this.shareTicket());
    
    // Print ticket
    this.printBtn?.addEventListener('click', () => this.printTicket());
    
    // Create another ticket
    this.createAnotherBtn?.addEventListener('click', () => this.createAnotherTicket());
  }

setupFileUpload() {
  this.avatarUpload = document.getElementById('avatar-upload'); // Make sure this gets assigned!

  // Drag and drop
  this.uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    this.uploadArea.style.borderColor = 'hsl(7, 88%, 67%)';
  });

  this.uploadArea.addEventListener('dragleave', (e) => {
    e.preventDefault();
    this.uploadArea.style.borderColor = 'hsl(252, 6%, 83%)';
  });

  this.uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    this.uploadArea.style.borderColor = 'hsl(252, 6%, 83%)';
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      this.handleFileUpload(files[0]);
    }
  });

  // File input
  this.avatarUpload.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      this.handleFileUpload(e.target.files[0]);
    }
  });
}

  handleFileUpload(file) {
    const maxSize = 500 * 1024; // 500KB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    // Clear previous errors
    this.clearError(this.avatarUpload);

    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      this.showError('avatar-upload', 'Please upload a JPG or PNG image.');
      return;
    }

    // Validate file size
    if (file.size > maxSize) {
      this.showError('avatar-upload', 'Image must be smaller than 500KB.');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target.result;
      if (result) {
        this.uploadedImageData = result;
        this.previewImage.src = result;
        this.uploadArea.querySelector('.upload-content').style.display = 'none';
        this.uploadPreview.style.display = 'flex';
      }
    };
    reader.readAsDataURL(file);
  }

  removeImage() {
    this.uploadedImageData = null;
    this.avatarUpload.value = '';
    this.uploadArea.querySelector('.upload-content').style.display = 'flex';
    this.uploadPreview.style.display = 'none';
    this.clearError(this.avatarUpload);
  }

  changeImage() {
    // Trigger the file input click to allow user to select a new image
    this.avatarUpload.click();
  }

  validateField(input) {
    const value = input.value.trim();
    const fieldName = input.name;

    switch (fieldName) {
      case 'fullName':
        if (!value) {
          this.showError('full-name', 'Please enter your full name.');
          return false;
        }
        if (value.length < 2) {
          this.showError('full-name', 'Name must be at least 2 characters long.');
          return false;
        }
        break;

      case 'email':
        if (!value) {
          this.showError('email', 'Please enter your email address.');
          return false;
        }
        if (!this.isValidEmail(value)) {
          this.showError('email', 'Please enter a valid email address.');
          return false;
        }
        break;

      case 'githubUsername':
        if (!value) {
          this.showError('github-username', 'Please enter your GitHub username.');
          return false;
        }
        if (!/^[a-zA-Z0-9]([a-zA-Z0-9]|-)*[a-zA-Z0-9]$/.test(value) && value.length > 1) {
          this.showError('github-username', 'Please enter a valid GitHub username.');
          return false;
        }
        break;
    }

    this.clearError(input);
    return true;
  }

  validateAvatar() {
    if (!this.uploadedImageData) {
      this.showError('avatar-upload', 'Please upload an avatar image.');
      return false;
    }
    return true;
  }

  ensureAvatarUploaded() {
    if (!this.uploadedImageData) {
      alert('Please upload your avatar image before submitting.');
      return false;
    }
    return true;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId.replace('-', '-') + '-error');
    
    field.classList.add('error');
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.setAttribute('aria-live', 'polite');
    }
  }

  clearError(input) {
    const fieldId = input.id;
    const errorElement = document.getElementById(fieldId.replace('-', '-') + '-error');
    
    input.classList.remove('error');
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.removeAttribute('aria-live');
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this.form);
    const fullName = formData.get('fullName').trim();
    const email = formData.get('email').trim();
    const githubUsername = formData.get('githubUsername').trim();

    // Validate all fields
    let isValid = true;
    const inputs = this.form.querySelectorAll('input[type="text"], input[type="email"]');
    
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    if (!this.ensureAvatarUploaded()) {
      isValid = false;
    }

    if (!isValid) {
      // Focus on first error field
      const firstError = this.form.querySelector('.error');
      if (firstError) {
        firstError.focus();
      }
      return;
    }

    // Generate ticket
    this.generateTicket(fullName, email, githubUsername);
  }

  generateTicket(fullName, email, githubUsername) {
    // Generate random ticket number
    const ticketNumber = '#' + Math.floor(Math.random() * 99999).toString().padStart(5, '0');

    // Store ticket data for sharing/downloading
    this.currentTicketData = {
      fullName,
      email,
      githubUsername,
      ticketNumber,
      avatar: this.uploadedImageData
    };

    // Update confirmation section
    document.getElementById('congrats-name').textContent = fullName;
    document.getElementById('congrats-email').textContent = email;
    document.getElementById('ticket-name').textContent = fullName;
    document.getElementById('ticket-handle').textContent = '@' + githubUsername;
    document.getElementById('ticket-code').textContent = ticketNumber;

    // Update avatar in ticket
    if (this.uploadedImageData) {
      document.getElementById('ticket-avatar').src = this.uploadedImageData;
    }

    // Show confirmation section with animation
    this.showConfirmation();
  }

  showConfirmation() {
    // Hide form section
    this.formSection.style.opacity = '0';
    this.formSection.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
      this.formSection.style.display = 'none';
      this.confirmationSection.style.display = 'block';
      
      // Animate in confirmation
      setTimeout(() => {
        this.confirmationSection.style.opacity = '1';
        this.confirmationSection.style.transform = 'translateY(0)';
      }, 50);
    }, 300);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Ticket Action Methods
  downloadTicket() {
    if (!this.currentTicketData) {
      alert('No ticket data available to download.');
      return;
    }

    // Create a canvas to render the ticket
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size (ticket dimensions)
    canvas.width = 800;
    canvas.height = 400;
    
    // Fill background with gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#16213e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add ticket border
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
    
    // Add text content
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Inconsolata, monospace';
    ctx.fillText('Coding Conf', 40, 60);
    
    ctx.font = '16px Inconsolata, monospace';
    ctx.fillStyle = '#cccccc';
    ctx.fillText('Jan 31, 2025 / Austin, TX', 40, 90);
    
    ctx.font = 'bold 20px Inconsolata, monospace';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(this.currentTicketData.fullName, 40, 300);
    
    ctx.font = '14px Inconsolata, monospace';
    ctx.fillStyle = '#cccccc';
    ctx.fillText('@' + this.currentTicketData.githubUsername, 40, 325);
    
    // Add ticket number
    ctx.save();
    ctx.translate(canvas.width - 50, canvas.height / 2);
    ctx.rotate(Math.PI / 2);
    ctx.font = 'bold 18px Inconsolata, monospace';
    ctx.fillStyle = '#cccccc';
    ctx.textAlign = 'center';
    ctx.fillText(this.currentTicketData.ticketNumber, 0, 0);
    ctx.restore();
    
    // Convert to blob and download
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `coding-conf-ticket-${this.currentTicketData.fullName.replace(/\s+/g, '-').toLowerCase()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  shareTicket() {
    if (!this.currentTicketData) {
      alert('No ticket data available to share.');
      return;
    }

    const shareData = {
      title: 'My Coding Conf 2025 Ticket',
      text: `I'm attending Coding Conf 2025! 🎫\n\nName: ${this.currentTicketData.fullName}\nTicket: ${this.currentTicketData.ticketNumber}\n\nJoin me at the biggest coding conference of the year!`,
      url: window.location.href
    };

    // Check if Web Share API is supported
    if (navigator.share) {
      navigator.share(shareData)
        .then(() => console.log('Ticket shared successfully'))
        .catch((error) => console.log('Error sharing ticket:', error));
    } else {
      // Fallback: copy to clipboard
      const textToShare = `${shareData.title}\n\n${shareData.text}\n\n${shareData.url}`;
      
      if (navigator.clipboard) {
        navigator.clipboard.writeText(textToShare)
          .then(() => {
            alert('Ticket details copied to clipboard! You can now paste and share it.');
          })
          .catch(() => {
            this.fallbackCopyToClipboard(textToShare);
          });
      } else {
        this.fallbackCopyToClipboard(textToShare);
      }
    }
  }

  fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      alert('Ticket details copied to clipboard! You can now paste and share it.');
    } catch (err) {
      alert('Unable to copy to clipboard. Please manually copy the ticket details.');
    }
    
    document.body.removeChild(textArea);
  }

  printTicket() {
    if (!this.currentTicketData) {
      alert('No ticket data available to print.');
      return;
    }

    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Coding Conf 2025 Ticket</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;500;700;800&display=swap');
          
          body {
            font-family: 'Inconsolata', monospace;
            margin: 0;
            padding: 20px;
            background: white;
            color: black;
          }
          
          .ticket {
            width: 600px;
            height: 300px;
            border: 3px solid #333;
            border-radius: 12px;
            padding: 30px;
            margin: 0 auto;
            position: relative;
            background: linear-gradient(135deg, #f5f5f5, #e0e0e0);
          }
          
          .ticket-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 15px;
          }
          
          .logo {
            width: 32px;
            height: 32px;
            background: #ff6b6b;
            border-radius: 6px;
          }
          
          .event-name {
            font-size: 24px;
            font-weight: 700;
            color: #333;
          }
          
          .event-details {
            font-size: 16px;
            color: #666;
            margin-bottom: 40px;
          }
          
          .ticket-body {
            display: flex;
            align-items: center;
            gap: 20px;
            margin-top: auto;
          }
          
          .avatar {
            width: 60px;
            height: 60px;
            border-radius: 8px;
            background: #ddd;
          }
          
          .attendee-name {
            font-size: 20px;
            font-weight: 700;
            color: #333;
            margin-bottom: 5px;
          }
          
          .attendee-handle {
            font-size: 14px;
            color: #666;
          }
          
          .ticket-code {
            position: absolute;
            top: 50%;
            right: 30px;
            transform: translateY(-50%) rotate(90deg);
            font-size: 18px;
            font-weight: 700;
            color: #999;
            letter-spacing: 2px;
          }
          
          @media print {
            body { margin: 0; padding: 10px; }
            .ticket { margin: 0; }
          }
        </style>
      </head>
      <body>
        <div class="ticket">
          <div class="ticket-header">
            <div class="logo"></div>
            <span class="event-name">Coding Conf</span>
          </div>
          <div class="event-details">Jan 31, 2025 / Austin, TX</div>
          <div class="ticket-body">
            <div class="avatar"></div>
            <div class="attendee-info">
              <div class="attendee-name">${this.currentTicketData.fullName}</div>
              <div class="attendee-handle">@${this.currentTicketData.githubUsername}</div>
            </div>
          </div>
          <div class="ticket-code">${this.currentTicketData.ticketNumber}</div>
        </div>
      </body>
      </html>
    `;
    
    printWindow.document.write(printContent);
    printWindow.document.close();
    
    // Wait for content to load, then print
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    };
  }

  createAnotherTicket() {
    // Reset form and show form section again
    this.form.reset();
    this.removeImage();
    this.currentTicketData = null;
    
    // Hide confirmation section
    this.confirmationSection.style.opacity = '0';
    this.confirmationSection.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      this.confirmationSection.style.display = 'none';
      this.formSection.style.display = 'block';
      
      // Animate in form
      setTimeout(() => {
        this.formSection.style.opacity = '1';
        this.formSection.style.transform = 'translateY(0)';
      }, 50);
    }, 300);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Initialize the ticket generator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new TicketGenerator();
});

// Add some CSS transitions via JavaScript for better UX
document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.textContent = `
    .form-section, .confirmation-section {
      transition: opacity 0.3s ease, transform 0.3s ease;
    }
    
    .confirmation-section {
      opacity: 0;
      transform: translateY(20px);
    }
    
    .confirmation-section[style*="display: block"] {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
});