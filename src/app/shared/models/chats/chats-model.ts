export class IChatsPayload {
    for: string = "";
    category: "overseer" | "admin" = "overseer";
    chat?: ChatModel
}

export class ChatModel {
    _id?: string;
    read: boolean = false;
    message: string = "";
    from: string = ""; // id of who sent it;
    to: string | "overseer" | "admin" = ""; // id of the receiver;
    date?: string;
}

export class ConcernedChatResponse {
    for: string = "";
    name?: string = "";
    totalUnreadMessages: number = 0;
}

export class ConcernedChatsResponse {
    concernedChats?: ConcernedChatResponse[];
    totalUnreadMessages: number = 0;
}
