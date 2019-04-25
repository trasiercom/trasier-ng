import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';

export interface TrasierConversation {
  conversationId: string;
  systemName: string;
}

@Injectable({
  providedIn: 'root'
})
export class TrasierNgService {
  private readonly TRASIER_CONVERSATION_KEY = 'trasier-conversation';
  private systemName;

  public init(name: string) {
    this.systemName = name;
  }

  public startConversation(): void {
    const conversationId = UUID.UUID();
    sessionStorage.setItem(
      this.TRASIER_CONVERSATION_KEY,
      JSON.stringify({ conversationId, systemName: this.systemName })
    );
  }

  public getConversation(): TrasierConversation | null {
    const conversation = sessionStorage.getItem(this.TRASIER_CONVERSATION_KEY);
    return conversation ? JSON.parse(conversation) : null;
  }

  public endConversation(): void {
    sessionStorage.removeItem(this.TRASIER_CONVERSATION_KEY);
  }
}
