import { ChangeEvent, FormEvent, InvalidEvent, TextareaHTMLAttributes, useState } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import localeBR from 'date-fns/locale/pt-BR';
import styles from './Post.module.css'
import { Comment } from './Comment';
import { Avatar } from './Avatar';



export function Post({ content, publishedAt, author }: PostProps) {

  const [hiddenFooter, setHiddenFooter] = useState(false);
  const [comments, setComments] = useState(['Post muito bacana']);
  const [newCommentText, setNewCommentText] = useState('');
  const isNewCommentInputEmpty = newCommentText.length === 0;

  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: localeBR
  })
  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: localeBR,
    addSuffix: true
  })

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();
    if (!newCommentText) return;
    setComments([...comments, newCommentText]);
    setNewCommentText('');
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event?.target?.setCustomValidity('')
    setNewCommentText(event?.target?.value);
  }

  function onDeleteComment(commentToDelete: string) {
    console.log(commentToDelete)
    const commentsWithoutDeletedOne = comments.filter(comment => {
      return comment !== commentToDelete;
    })
    setComments(commentsWithoutDeletedOne);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event?.target?.setCustomValidity('Esse campo é obrigatório')
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />

          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        <time title={publishedDateFormatted} dateTime={publishedAt.toLocaleDateString()}>{publishedDateRelativeToNow}</time>
      </header>
      <div className={styles.content}>
        {content.map((line, index) => {
          if (line.type === 'paragraph') {
            return <p key={line.content}>{line.content}</p>
          }

          if (line.type === 'link') {
            return <p key={line.content}><a href="">{line.content}</a></p>
          }
        })}
      </div>

      <form
        onSubmit={handleCreateNewComment}
        className={styles.commentForm}
      >
        <strong>Deixe seu feedback</strong>
        <textarea
          name='comment'
          placeholder='Deixe um comentário'
          required
          onInvalid={handleNewCommentInvalid}
          value={newCommentText}
          onChange={handleNewCommentChange}
        />
        <footer>
          <button
            type='submit'
            disabled={isNewCommentInputEmpty}
          >
            Publicar
          </button>
        </footer>

      </form>
      <div className={styles.commentList}>
        {comments.map(comment => (
          <Comment
            key={comment}
            content={comment}
            onDeleteComment={onDeleteComment} />
        )).reverse()}
      </div>
    </article>
  );
}

type AuthorProps = {
  avatarUrl: string,
  name: string,
  role: string
}
type ContentProps = {
  type: 'paragraph' | 'link',
  content: string
}

export type PostProps = {
  id?: number,
  content: ContentProps[],
  publishedAt: Date,
  author: AuthorProps,
}