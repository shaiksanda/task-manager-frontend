import { toast } from "react-toastify";

let interval;

export const stagedTimers = {
    start: () => {
        let elapsed = 0;

        interval = setInterval(() => {
            elapsed += 8;

            if (elapsed === 8)
                toast.info("Waking up the server…");
            if (elapsed === 16)
                toast.info("Server is processing your request…");
            if (elapsed === 24)
                toast.info("Still working, hang tight…");
            if (elapsed === 32)
                toast.info("Our deployment is on a free tier — it might take a little longer 🙏");
            if (elapsed === 40)
                toast.info("Thanks for your patience! Just a few more seconds ⏳");
            if (elapsed === 48)
                toast.info("Almost done! Your request will be ready any moment now 🚀");
            if (elapsed === 56)
                toast.info("Finalizing everything… You’ll see the result shortly 💫");

            if (elapsed >= 64) {
                toast.error("Server not responding. Please try again later.");
                clearInterval(interval);
            }
        }, 8000);
    },

    stop: () => {
        clearInterval(interval);
        interval = null;
    },
};
