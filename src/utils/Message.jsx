import Swal from "sweetalert2";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/toastdemo.css";

/**
 * 
 * @param {string} message Enter a message (type: String)
 * @param {string} icon Enter an icon name (type: String) 
 */
function Message (message, icon) {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });

    Toast.fire({
        icon: icon,
        title: "Successfully",
        text: message,
    });
}


const CustomToast = ({text, title, icon, message}) => (
    <div className="container-toast">
        <div className="icon-toast">
            <span className="material-symbols-outlined">{icon}</span>
        </div>
        <div className="body-toast">
            <div className="title-toast">
                <p>{title}</p>
            </div>
            <div className="message-toast">
                <p>{message}</p>
            </div>
        </div>
    </div>
);

/**
 * 
 * @param {string} theme Theme name to apply: success, info, error or warning (type: String)
 * @param {string} message Enter a message (type: String)
 * @param {string} title Enter a title to the message (type: String)
 */
const ToastCustom = (theme, message, title) => {
    toast(
        <CustomToast
            text={message}
            title={title}
            icon={
                theme === "success"
                    ? "check_circle"
                    : theme === "info"
                        ? "info"
                        : theme === "warning"
                            ? "warning"
                            : "cancel"
            }
            message={message}
        />,
        {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            className: theme,
            progress: undefined,
        }
    );
};

export {
    Message,
    ToastCustom
}