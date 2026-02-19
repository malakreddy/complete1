
import './globals.css';

export const metadata = {
    title: 'Next.js Auth System',
    description: 'Secure Login & Registration',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
