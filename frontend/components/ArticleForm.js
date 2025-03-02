import React, { useEffect, useState } from 'react'
import PT from 'prop-types'

const initialFormValues = { title: '', text: '', topic: '' }

export default function ArticleForm(props) {
  const [values, setValues] = useState(initialFormValues)
  
  const { currentArticleId,
    articles,
    setCurrentArticleId,
    updateArticle,
    postArticle 
  } = props

  useEffect(() => {
    if(currentArticleId){
      const currentArticle = articles.filter(art => art.article_id === currentArticleId)
      setValues(currentArticle[0])
    }else{
      setValues(initialFormValues)
    }
  }, [currentArticleId])

  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
  }

  const onSubmit = evt => {
    evt.preventDefault()
    console.log(evt)
    if(currentArticleId){
      let data = {
        article_id: currentArticleId,
        article: values
      }
      setValues(initialFormValues)
      return updateArticle(data)
    }else{
      postArticle(values)
      setValues(initialFormValues)
    }
  }

  const isDisabled = () => {
    if(values.text && values.topic && values.title){
      return false
    }else{
      return true
    }
  }

  const cancel = (e) => {
    e.preventDefault();
    setCurrentArticleId();
    setValues(initialFormValues)
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>{currentArticleId ? "Edit Article" : "Create Article"}</h2>
      <input
        maxLength={50}
        onChange={onChange}
        value={values.title}
        placeholder="Enter title"
        id="title"
      />
      <textarea
        maxLength={200}
        onChange={onChange}
        value={values.text}
        placeholder="Enter text"
        id="text"
      />
      <select onChange={onChange} id="topic" value={values.topic}>
        <option value="">-- Select topic --</option>
        <option value="JavaScript">JavaScript</option>
        <option value="React">React</option>
        <option value="Node">Node</option>
      </select>
      <div className="button-group">
        <button disabled={isDisabled()} id="submitArticle">Submit</button>
        <button onClick={(e) => cancel(e)}>Cancel edit</button>
      </div>
    </form>
  )
}
// 🔥 No touchy: LoginForm expects the following props exactly:
ArticleForm.propTypes = {
  postArticle: PT.func.isRequired,
  updateArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticle: PT.shape({ // can be null or undefined, meaning "create" mode (as opposed to "update")
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  })
}
