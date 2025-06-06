import { useState, useEffect } from 'react';
import PhoneForm from './components/PhoneForm';
import OtpForm from './components/OtpForm';

// Add keyframes animations
const keyframes = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

// Define styles object for inline styling
const styles = {
  appContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #eff6ff, #e0e7ff)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem 1rem',
  },
  cardContainer: {
    width: '100%',
    maxWidth: '420px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '0.75rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    padding: '2rem',
    width: '100%',
    animation: 'fadeIn 0.5s ease-out',
  },
  textCenter: {
    textAlign: 'center',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '0.5rem',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '0.875rem',
    color: '#6b7280',
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  successIcon: {
    width: '4rem',
    height: '4rem',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: '9999px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1.5rem',
  },
  icon: {
    width: '2.5rem',
    height: '2.5rem',
    stroke: '#10b981',
  },
  button: {
    display: 'block',
    width: '100%',
    padding: '0.75rem 1rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    textAlign: 'center',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginTop: '1.5rem',
    backgroundColor: '#4f46e5',
    color: 'white',
  },
};

function App() {
  const [step, setStep] = useState('phone'); // 'phone', 'otp', 'success'
  const [phoneNumber, setPhoneNumber] = useState('');
  
  // Add style tag with keyframes to the document head on component mount
  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = keyframes;
    document.head.appendChild(styleTag);
    
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  const handleOtpSent = (phone) => {
    setPhoneNumber(phone);
    setStep('otp');
  };

  const handleVerificationSuccess = () => {
    setStep('success');
  };

  const handleBackToPhone = () => {
    setStep('phone');
  };

  return (
    <div style={styles.appContainer}>
      <div style={styles.cardContainer}>
        {step === 'phone' && (
          <PhoneForm onOtpSent={handleOtpSent} />
        )}
        
        {step === 'otp' && (
          <OtpForm
            phoneNumber={phoneNumber}
            onVerificationSuccess={handleVerificationSuccess}
            onBackToPhone={handleBackToPhone}
          />
        )}
        
        {step === 'success' && (
          <div style={styles.card}>
            <div style={styles.textCenter}>
              <div style={styles.successIcon}>
                <svg style={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 style={styles.title}>Verification Successful</h2>
              <p style={styles.subtitle}>Your phone number has been verified successfully.</p>
              <button
                onClick={handleBackToPhone}
                style={styles.button}
              >
                Start Over
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
