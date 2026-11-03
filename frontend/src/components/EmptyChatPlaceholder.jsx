import { MessageCircle } from "lucide-react";

const EmptyChatPlaceholder = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      <div className="max-w-md text-center">
        <div className="flex justify-center mb-4">
          <MessageCircle size={64} className="text-base-content/40" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Welcome to Chat App</h2>
        <p className="text-base-content/60 mb-4">
          Select a conversation from the sidebar to start chatting with your friends.
        </p>
        <div className="text-sm text-base-content/40">
          <p>• Send text messages</p>
          <p>• Share images</p>
          <p>• Real-time messaging</p>
        </div>
      </div>
    </div>
  );
};

export default EmptyChatPlaceholder;
