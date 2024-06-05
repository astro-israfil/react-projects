const Container = ({
    children,
    className = ""
}) => {
    return (
        <div className={`w-full px-8 relative bg-gray-50 dark:bg-black text-slate-900 dark:text-blue-100 min-h-screen transition-all duration-200 ${className} relative`}>
            {children}
        </div>
    );
};

export default Container;