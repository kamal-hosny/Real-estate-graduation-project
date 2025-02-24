import { Link, useRouteError } from "react-router-dom";
import LottieHandler from "../components/common/feedback/LottieHandler/LottieHandler";
import Button from "../components/ui/Button";

interface RouteError {
    status?: number;
    message?: string;
}

const Error = () => {
    const error = useRouteError() as RouteError;
    console.error(error); 

    let errorMessage = "An unknown error occurred.";
    let errorTitle = "Oops! Something went wrong.";

    if (error.status === 404) {
        errorTitle = "Oops! Page Not Found";
        errorMessage = "It seems like the page you are looking for doesn't exist.";
    } else if (error.status === 500) {
        errorTitle = "Oops! Server Error";
        errorMessage = "Something went wrong on our end. Please try again later.";
    } else if (error.message) {
        errorMessage = error.message;
    }

    return (
        <div className="text-center bg-main-color-background flex flex-col w-screen h-screen justify-center items-center p-4">
            <LottieHandler type="notFound" />
            <h1 className="text-2xl font-bold text-color-text-1 mb-4">{errorTitle}</h1>
            <p className="text-lg text-color-text-2 mb-6">{errorMessage}</p>

            <div className="flex flex-col items-center">
                <Link to="/" replace={true} className="text-color-text-1 font-medium text-lg mb-4">
                    How about going back to safety?
                </Link>
                <Link to="/contact" className="text-color-text-1 font-medium text-lg">
                    Contact Support
                </Link>
            </div>

            <Button
                onClick={() => window.location.reload()}
                className="mt-6 px-4 py-2 bg-button-color hover:bg-button-hover-color text-main-color-background rounded-md font-medium"
            >
                Try Again
            </Button>
        </div>
    );
};

export default Error;