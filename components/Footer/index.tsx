import type { NextPage } from "next";
import styles from './index.module.scss';

const Footer: NextPage = ()=>{
  return <div className={styles.footer}> 
         <p>仿掘金的my-blog</p> 
    </div>
};
export default Footer;

