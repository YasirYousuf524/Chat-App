import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import ChatList from "../components/ChatList.jsx";
import ChatWindow from "../components/ChatWindow.jsx";
import EmptyChatPlaceholder from "../components/EmptyChatPlaceholder.jsx";

const HomePage = () => {
  const { getUsers, users, selectedUser } = useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (authUser) {
      getUsers();
    }
  }, [authUser, getUsers]);

  return (
    <div className="h-screen bg-base-200 flex">
      <div className="w-full lg:w-1/3 border-r border-base-300">
        <ChatList />
      </div>
      
      <div className="hidden lg:flex flex-1">
        {selectedUser ? (
          <ChatWindow />
        ) : (
          <EmptyChatPlaceholder />
        )}
      </div>
      
      {/* Mobile view - show chat window when user is selected */}
      <div className="lg:hidden flex-1">
        {selectedUser ? (
          <ChatWindow />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-semibold">Select a chat to start messaging</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
