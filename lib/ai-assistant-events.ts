type AIAssistantEventHandler = (message: string) => void

class AIAssistantEventEmitter {
  private handlers: AIAssistantEventHandler[] = []

  subscribe(handler: AIAssistantEventHandler) {
    this.handlers.push(handler)
    return () => {
      this.handlers = this.handlers.filter((h) => h !== handler)
    }
  }

  emit(message: string) {
    this.handlers.forEach((handler) => handler(message))
  }
}

export const aiAssistantEvents = new AIAssistantEventEmitter()
