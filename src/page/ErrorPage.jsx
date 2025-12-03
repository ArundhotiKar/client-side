const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-5xl font-bold text-red-600">404</h1>
            <p className="text-xl mt-3">Page Not Found</p>
            <a href="/" className="btn btn-neutral mt-6">
                Go Home
            </a>
        </div>
    );
};

export default ErrorPage;