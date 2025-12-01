// Certificate Component
const { useState, useContext } = React;

function Certificate({ user, onClose }) {
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const handlePrint = () => {
        window.print();
    };

    const handleDownload = () => {
        // Simple download using print to PDF
        alert('Please use your browser\'s Print function and select "Save as PDF" to download the certificate.');
        window.print();
    };

    return (
        <div className="certificate-overlay">
            <div className="certificate-container">
                <div className="certificate-actions-top">
                    <button className="cert-close-btn" onClick={onClose}>✕ Close</button>
                </div>

                <div className="certificate" id="certificate">
                    <div className="certificate-border">
                        <div className="certificate-content">
                            <div className="certificate-header">
                                <div className="cert-logo">⚛️</div>
                                <h1 className="cert-title">Certificate of Completion</h1>
                                <div className="cert-subtitle">React Mastery: Zero to Hero</div>
                            </div>

                            <div className="certificate-body">
                                <p className="cert-text">This is to certify that</p>
                                <h2 className="cert-name">{user.name}</h2>
                                <p className="cert-text">has successfully completed the comprehensive</p>
                                <h3 className="cert-course">React Development Course</h3>
                                <p className="cert-description">
                                    Demonstrating proficiency in React fundamentals, hooks, state management,
                                    routing, API integration, TypeScript, testing, and production deployment.
                                </p>

                                <div className="cert-details">
                                    <div className="cert-detail-item">
                                        <strong>22 Lessons Completed</strong>
                                    </div>
                                    <div className="cert-detail-item">
                                        <strong>100% Progress</strong>
                                    </div>
                                    <div className="cert-detail-item">
                                        <strong>All Exercises Passed</strong>
                                    </div>
                                </div>
                            </div>

                            <div className="certificate-footer">
                                <div className="cert-date">
                                    <div className="cert-line"></div>
                                    <p>Date: {currentDate}</p>
                                </div>
                                <div className="cert-signature">
                                    <div className="cert-line"></div>
                                    <p>React Mastery Academy</p>
                                </div>
                            </div>

                            <div className="certificate-seal">
                                <div className="seal">
                                    <div className="seal-inner">
                                        <div className="seal-text">⚛️</div>
                                        <div className="seal-subtext">CERTIFIED</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="certificate-actions">
                    <button className="cert-action-btn print" onClick={handlePrint}>
                        🖨️ Print Certificate
                    </button>
                    <button className="cert-action-btn download" onClick={handleDownload}>
                        📥 Download PDF
                    </button>
                </div>
            </div>
        </div>
    );
}

// Export component
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Certificate };
}
