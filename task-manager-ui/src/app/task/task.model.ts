export interface Task {
  id: number
  title: string
  description?: string | null
  due?: string | null
  priority?: Priority | null
  completed: boolean
  categoryId: number
  createdAt: string
  updatedAt: string
}

export enum Priority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low'
}
