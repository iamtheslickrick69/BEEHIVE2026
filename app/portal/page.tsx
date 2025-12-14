import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Haestus Client Portal - Preview Access',
  robots: 'noindex',
}

export default function PortalPage() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style dangerouslySetInnerHTML={{
          __html: `
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }

            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              background: linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%);
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 20px;
            }

            .portal-container {
              background: rgba(255, 255, 255, 0.03);
              backdrop-filter: blur(10px);
              border: 1px solid rgba(255, 255, 255, 0.1);
              border-radius: 24px;
              padding: 48px;
              max-width: 480px;
              width: 100%;
              box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            }

            .logo-container {
              display: flex;
              justify-content: center;
              margin-bottom: 32px;
            }

            .logo {
              width: 80px;
              height: 80px;
              background: linear-gradient(135deg, #E8C24A 0%, #d4af3a 100%);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 10px 30px rgba(232, 194, 74, 0.3);
            }

            .logo svg {
              width: 40px;
              height: 40px;
              color: #000;
            }

            h1 {
              color: #fff;
              font-size: 28px;
              font-weight: 700;
              text-align: center;
              margin-bottom: 12px;
              letter-spacing: -0.5px;
            }

            .subtitle {
              color: rgba(255, 255, 255, 0.6);
              text-align: center;
              font-size: 15px;
              line-height: 1.6;
              margin-bottom: 32px;
            }

            .form-group {
              margin-bottom: 24px;
            }

            label {
              display: block;
              color: rgba(255, 255, 255, 0.8);
              font-size: 14px;
              font-weight: 500;
              margin-bottom: 8px;
            }

            input[type="password"] {
              width: 100%;
              padding: 14px 16px;
              background: rgba(255, 255, 255, 0.08);
              border: 2px solid rgba(255, 255, 255, 0.15);
              border-radius: 12px;
              color: #fff;
              font-size: 16px;
              transition: all 0.3s ease;
              outline: none;
            }

            input[type="password"]:focus {
              background: rgba(255, 255, 255, 0.12);
              border-color: #E8C24A;
              box-shadow: 0 0 0 3px rgba(232, 194, 74, 0.1);
            }

            input[type="password"]::placeholder {
              color: rgba(255, 255, 255, 0.4);
            }

            .error-message {
              background: rgba(239, 68, 68, 0.1);
              border: 1px solid rgba(239, 68, 68, 0.3);
              color: #fca5a5;
              padding: 12px 16px;
              border-radius: 8px;
              font-size: 14px;
              margin-bottom: 20px;
              display: none;
              animation: shake 0.5s;
            }

            .error-message.show {
              display: block;
            }

            @keyframes shake {
              0%, 100% { transform: translateX(0); }
              25% { transform: translateX(-10px); }
              75% { transform: translateX(10px); }
            }

            button {
              width: 100%;
              padding: 14px;
              background: linear-gradient(135deg, #E8C24A 0%, #d4af3a 100%);
              color: #000;
              border: none;
              border-radius: 12px;
              font-size: 16px;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.3s ease;
              box-shadow: 0 4px 12px rgba(232, 194, 74, 0.3);
            }

            button:hover {
              transform: translateY(-2px);
              box-shadow: 0 6px 20px rgba(232, 194, 74, 0.4);
            }

            button:active {
              transform: translateY(0);
            }

            button:disabled {
              opacity: 0.6;
              cursor: not-allowed;
              transform: none;
            }

            .footer {
              margin-top: 32px;
              padding-top: 24px;
              border-top: 1px solid rgba(255, 255, 255, 0.1);
              text-align: center;
            }

            .footer p {
              color: rgba(255, 255, 255, 0.4);
              font-size: 13px;
            }

            .footer a {
              color: #E8C24A;
              text-decoration: none;
              transition: color 0.3s;
            }

            .footer a:hover {
              color: #d4af3a;
            }

            @media (max-width: 480px) {
              .portal-container {
                padding: 32px 24px;
              }

              h1 {
                font-size: 24px;
              }
            }
          `
        }} />
      </head>
      <body>
        <div className="portal-container">
          <div className="logo-container">
            <div className="logo">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>

          <h1>Client Portal</h1>
          <p className="subtitle">
            Enter your access code to view the BeeHive Rental & Sales preview.
          </p>

          <form id="portalForm">
            <div id="errorMessage" className="error-message">
              Incorrect password. Please try again.
            </div>

            <div className="form-group">
              <label htmlFor="password">Access Code</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your access code"
                autoComplete="off"
                required
                autoFocus
              />
            </div>

            <button type="submit" id="submitBtn">
              Access Preview
            </button>
          </form>

          <div className="footer">
            <p>
              Powered by <a href="https://haestus.dev" target="_blank" rel="noopener noreferrer">Haestus</a>
            </p>
          </div>
        </div>

        <script dangerouslySetInnerHTML={{
          __html: `
            const CORRECT_PASSWORD = 'beehive2026';
            const REDIRECT_URL = 'https://beehive-2026.vercel.app';

            const form = document.getElementById('portalForm');
            form.addEventListener('submit', function(event) {
              event.preventDefault();

              const passwordInput = document.getElementById('password');
              const errorMessage = document.getElementById('errorMessage');
              const submitBtn = document.getElementById('submitBtn');
              const enteredPassword = passwordInput.value;

              errorMessage.classList.remove('show');

              if (enteredPassword === CORRECT_PASSWORD) {
                submitBtn.textContent = 'Redirecting...';
                submitBtn.disabled = true;
                passwordInput.disabled = true;

                sessionStorage.setItem('haestus_auth', 'true');

                setTimeout(() => {
                  window.location.href = REDIRECT_URL;
                }, 800);
              } else {
                errorMessage.classList.add('show');
                passwordInput.value = '';
                passwordInput.focus();
              }
            });

            document.getElementById('password').addEventListener('input', function() {
              document.getElementById('errorMessage').classList.remove('show');
            });
          `
        }} />
      </body>
    </html>
  )
}
