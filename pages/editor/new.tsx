import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { ChangeEvent, useEffect, useState } from "react";
import styles from './index.module.scss';
import { Input, Button, message, Select } from 'antd'
import request from 'service/fetch';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { useStore } from 'store/index';

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);

function NewEditor() {
  const store = useStore();
  const { push } = useRouter();
  const { userId } = store.user.userInfo;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [allTags, setAllTags] = useState([]);
  const [tagIds, setTagIds] = useState([]);

  useEffect(() => {
    request.get('/api/tag/get').then((res: any) => {
      if (res?.code === 0) {
        setAllTags(res?.data?.allTags || []);
      }
    })
  },[]);

  const handlePublish = () =>{
      if(!title) {
          message.warning('请输入文章标题');
          return ;
      }
      request.post('/api/article/publish',{
          title,
          content,
          tagIds
      }).then((res: any) => {
          if(res?.code === 0) {
            // todo 跳转
            userId ? push(`/user/${userId}`) : push('/');
            message.success('发布成功');
          } else {
            message.error(res?.msg || '发布失败');
          }
      })

  }
  // eslint-disable-next-line no-undef
  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event?.target?.value);
  };

  const handleContentChange = (content: any) =>{
    setContent(content);
  }

  const handleSelectTag = (value: []) => {
    // console.log('SelectTag  --> value: ',value);
    setTagIds(value);
  }

  return (
    <div className={styles.container}>
        <div className={styles.operation}>
           <Input className={styles.title} placeholder="请输入文章标题" value={title} onChange={handleTitleChange}/>
           <Select 
              className={styles.tag}
              mode="multiple"
              allowClear
              placeholder="请选择标签"
              onChange={handleSelectTag}
           >{allTags?.map((tag: any) => (
             <Select.Option key={tag?.id} value={tag?.id}>{tag?.title}</Select.Option>
           ))}
           </Select>
           <Button className={styles.button} type="primary" onClick={handlePublish}>发布</Button>
        </div>
      <MDEditor value={content} height={1080} onChange={handleContentChange} />
    </div>
  );
}

(NewEditor as any).layout = null;
export default observer(NewEditor);