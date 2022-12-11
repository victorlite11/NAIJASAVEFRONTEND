import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { OperationFeedback } from '../../interface/shared-interface';
import { IChatsPayload, ConcernedChatsResponse, ChatModel } from '../../models/chats/chats-model';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  constructor(
    private http: HttpClient,
    @Inject('CHATS_ENDPOINT') private chatsEndpoint: string
  ) { }

  async insertChat(payload: IChatsPayload)/*: Promise<OperationFeedback>*/ {
    return await this.http.post(this.chatsEndpoint + "/insert", payload).toPromise().then(resp => {
      return;
    }).catch((e: HttpErrorResponse) => {
      return;
    })
  }

  async retrieveConcernedChats(category: "admin" | "overseer", id: string): Promise<ConcernedChatsResponse> {

    return this.http.get(this.chatsEndpoint + `/retrieve-concerned-chats?category=${category}&id=${id}`).toPromise().then(resp => {

        return resp as ConcernedChatsResponse; 

    });
  }

  async retrieveChatsFor(payload: IChatsPayload): Promise<ChatModel[]> {

    return this.http.post(this.chatsEndpoint + `/retrieve`, payload).toPromise().then(resp => {

        return resp as ChatModel[]; 

    });
  }
}
