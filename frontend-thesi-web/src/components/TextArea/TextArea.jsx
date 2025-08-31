import React, { useState } from 'react';
import styles from './TextArea.module.css'

const TextArea = ( {placeholder, value, onChange, maxLength} ) => {

  const [charCount, setCharCount] = useState(0);

  const handleChange = (e) => {
    setCharCount(e.target.value.length);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={styles.container} >
      <textarea 
        className={styles.textarea} 
        placeholder={placeholder} 
        onChange={handleChange} 
        maxLength={maxLength} 
        value={value}
        required >
      </textarea>
      <div className={styles.counter}>
        {charCount}/{maxLength}
      </div>
    </div>
  )
}

export default TextArea
