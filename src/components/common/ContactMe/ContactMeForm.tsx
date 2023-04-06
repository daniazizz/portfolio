import MatrixElement from "../MatrixElement/MatrixElement";

interface Props {
  onExit: () => void;
  onSubmit: () => void;
  visible: boolean;
}

const ContactMeForm = ({ onExit, onSubmit, visible }: Props) => {
  return (
    <div>
      {visible && (
        <form
          className="p-2 flex flex-col justify-center bg-black bg-opacity-80 border-2 border-dashed border-green-600"
          // style={{ width: 360 }}
        >
          <div
            className="flex justify-end cursor-pointer"
            onClick={() => onExit()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className="flex flex-col items-start m-3">
            <label htmlFor="name" className="cursor-default">
              <MatrixElement id="name-label" effect="fx6">
                Name:
              </MatrixElement>
            </label>
            <input
              id="name"
              type="text"
              placeholder="Morpheus"
              className="cursor-text w-full bg-transparent border-green-600 border-2 border-dashed p-3 outline-none focus:border-double placeholder:text-green-600 placeholder:opacity-60"
            />
          </div>
          <div className="flex flex-col items-start m-3">
            <label htmlFor="email" className="cursor-default">
              <MatrixElement id="email-label" effect="fx6">
                Email:
              </MatrixElement>
            </label>
            <input
              id="email"
              type="text"
              placeholder={"morpheus@matrix.ai"}
              className="cursor-text w-full bg-transparent border-green-600 border-2 border-dashed p-3 outline-none focus:border-double placeholder:text-green-600 placeholder:opacity-60"
            />
          </div>
          <div className="flex flex-col items-start m-3">
            <label htmlFor="message" className="cursor-default">
              <MatrixElement id="message-label" effect="fx6">
                Message:
              </MatrixElement>
            </label>
            <textarea
              id="message"
              cols={30}
              rows={10}
              placeholder="Hello Neo..."
              className="cursor-text bg-transparent border-green-600 border-2 border-dashed p-3 resize-none overflow-hidden outline-none focus:border-double placeholder:text-green-600 placeholder:opacity-60"
            ></textarea>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactMeForm;
