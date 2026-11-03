import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";

const ChatHeader = () => {
  const { selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  if (!selectedUser) return null;

  return (
    <div className="bg-base-100 border-b border-base-300 px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="w-full h-full object-cover"
            />
          </div>
          {onlineUsers.includes(selectedUser._id) && (
            <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-base-100"></span>
          )}
        </div>
        <div>
          <h3 className="font-semibold">{selectedUser.fullName}</h3>
          <p className="text-sm text-base-content/60">
            {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
