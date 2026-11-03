import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import { ScrollArea } from "./ui/scroll-area.jsx";

const ChatList = () => {
  const { users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();

  if (isUsersLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="flex items-center justify-center h-full">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <div className="border-b border-base-300 p-4">
        <h2 className="font-bold text-lg">Chats</h2>
      </div>
      <ScrollArea className="flex-1">
        {users.map((user) => {
          const isOnline = onlineUsers.includes(user._id);
          const isSelected = selectedUser?._id === user._id;

          return (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`
                w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors
                ${isSelected ? "bg-base-300 border-l-4 border-primary" : ""}
              `}
            >
              <div className="relative mx-auto lg:mx-0">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={user.profilePic || "/avatar.png"}
                    alt={user.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
                {isOnline && (
                  <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-base-100"></span>
                )}
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="font-medium truncate">{user.fullName}</div>
                <div className="text-sm text-base-content/60">
                  {isOnline ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          );
        })}
        {users.length === 0 && (
          <div className="text-center text-base-content/60 p-4">
            No users found
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default ChatList;
