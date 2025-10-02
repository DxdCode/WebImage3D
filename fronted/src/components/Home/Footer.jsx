import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full bg-green-900 dark:bg-gray-900 text-white py-6 dark:border-gray-700">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-28">
                <p className="text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} DxdCode. Todos los derechos reservados.</p>
                <div className="flex gap-4">
                    <a
                        href="https://github.com/DxdCode"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-orange-500 transition-colors flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.1 3.29 9.43 7.86 10.96.57.1.78-.25.78-.55v-2c-3.2.7-3.87-1.55-3.87-1.55-.52-1.32-1.27-1.67-1.27-1.67-1.04-.7.08-.69.08-.69 1.15.08 1.75 1.18 1.75 1.18 1.02 1.74 2.68 1.23 3.33.94.1-.73.4-1.23.72-1.52-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.3 1.18-3.12-.12-.29-.51-1.44.11-3 0 0 .96-.31 3.15 1.18.92-.26 1.9-.39 2.88-.39.98 0 1.96.13 2.88.39 2.18-1.49 3.14-1.18 3.14-1.18.62 1.56.23 2.71.11 3 .73.82 1.17 1.86 1.17 3.12 0 4.42-2.7 5.39-5.27 5.68.41.36.77 1.08.77 2.18v3.24c0 .31.21.66.79.55C20.71 21.43 24 17.1 24 12c0-6.27-5.23-11.5-12-11.5z" />
                        </svg>
                        GitHub
                    </a>
                    <a
                        href="https://dxdcode.pages.dev/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-orange-500 transition-colors flex items-center gap-1"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10
                                     10-4.48 10-10S17.52 2 12 2zm6 12c0
                                     1.77-.77 3.34-2 4.44V9.56c1.23
                                     1.1 2 2.67 2 4.44zm-6-8c1.66
                                     0 3.14.69 4.22 1.78l-8.44 8.44C6.69
                                     15.14 7.69 12 12 12zm-4.22-1.78C10.36
                                     5.69 11.84 5 13.5 5 9.91 5 7 7.91
                                     7 11.5S9.91 18 13.5 18c-1.66
                                     0-3.14-.69-4.22-1.78l8.44-8.44z"/>
                        </svg>
                        Mi sitio web
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
