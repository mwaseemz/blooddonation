# LifeBlood - Blood Donation Website

A modern, user-friendly website for blood donation services with EmailJS contact form integration.

## Features

- **Modern, Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Smooth Animations** - Engaging animations and transitions throughout the site
- **Contact Form with EmailJS** - Fully functional contact form that sends emails directly
- **Hero Section** - Eye-catching hero with animated blood drop and key statistics
- **About Section** - Highlighting the importance of blood donation
- **How It Works** - Step-by-step guide for potential donors
- **Contact Information** - Multiple ways to get in touch

## Setup Instructions

### 1. EmailJS Configuration

To enable the contact form, you need to set up EmailJS:

1. **Create an EmailJS Account**
   - Go to [https://www.emailjs.com/](https://www.emailjs.com/)
   - Sign up for a free account

2. **Add Email Service**
   - In your EmailJS dashboard, go to "Email Services"
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the instructions to connect your email

3. **Create Email Template**
   - Go to "Email Templates"
   - Click "Create New Template"
   - Use this template structure:

   ```
   Subject: New Contact Form Submission - {{subject}}

   You have received a new message from your LifeBlood website:

   Name: {{from_name}}
   Email: {{from_email}}
   Phone: {{phone}}
   Subject: {{subject}}

   Message:
   {{message}}
   ```

4. **Get Your Credentials**
   - Service ID: Found in Email Services section
   - Template ID: Found in Email Templates section
   - Public Key: Found in Account > General settings

5. **Update the Website**
   - Open `script.js`
   - Replace the placeholder values in the `EMAILJS_CONFIG` object:

   ```javascript
   const EMAILJS_CONFIG = {
       serviceID: 'your_service_id_here',
       templateID: 'your_template_id_here',
       publicKey: 'your_public_key_here'
   };
   ```

### 2. Running the Website

Simply open `index.html` in your web browser. No build process or server required!

For development, you can use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## Project Structure

```
blooddonation/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles and animations
├── script.js           # JavaScript for EmailJS and interactivity
└── README.md           # This file
```

## Customization

### Colors
All colors are defined as CSS variables in `styles.css`:
- `--primary-red`: Main brand color
- `--secondary-blue`: Accent color
- `--dark`: Text color
- Modify these to match your brand

### Content
Edit `index.html` to update:
- Organization name and logo
- Statistics (Lives Saved, Active Donors, etc.)
- Contact information
- Footer links

### EmailJS Template Variables
The form sends these variables to EmailJS:
- `from_name` - Sender's name
- `from_email` - Sender's email
- `phone` - Sender's phone (optional)
- `subject` - Selected subject
- `message` - Message content
- `to_name` - Recipient name (LifeBlood Team)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Technologies Used

- HTML5
- CSS3 (Grid, Flexbox, Animations)
- JavaScript (ES6+)
- EmailJS for form handling
- Google Fonts (Inter)

## License

This project is open source and available for use.

## Support

For issues or questions about EmailJS integration, visit their [documentation](https://www.emailjs.com/docs/).
