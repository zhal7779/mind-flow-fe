export interface IFile {
  file_id: string;
  file_name: string;
  tag: string;
  theme_color: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  storage: boolean;
  deleted_at: null | string;
  scheduled_deletion_at: null | string;
}
