import { useRef, useState } from 'react';
import Button from '../Button/Button';
import File from '../File/File';
import Icon from '../Icons/Icon';
import styles from './StepTwoForm.module.css';

export default function StepTwoForm({ projectData, setProjectData }) {
  const fileInputRef = useRef();
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setProjectData({ ...projectData, templateFile: [...projectData.templateFile, ...files] });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    setProjectData({ ...projectData, templateFile: [...projectData.templateFile, ...files] });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeFile = (name) => {
    const updated = projectData.templateFile.filter((file) => file.name !== name);
    setProjectData({ ...projectData, templateFile: updated });
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  console.log(projectData);

  return (
    <>
      <div className="h3">Exportar arquivos</div>
      <p>Escolha as telas que serão avaliadas ou crie um projeto sem imagens.</p>

      <div
        className={`${styles.uploadContainer} ${isDragging ? styles.dragging : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <Icon icon={<i className="bi bi-cloud-arrow-up-fill"></i>} />
        <p>Você pode arrastar os arquivos aqui ou</p>

        <input
          ref={fileInputRef}
          style={{ display: 'none' }}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />

        <Button id='form_btn' children="Escolher arquivos" variant="primary" onClick={handleButtonClick} />
      </div>

      <label>Telas</label>

      <div className={styles.filesContainer}>
        {projectData.templateFile.length > 0 ? (
          projectData.templateFile.map((file, index) => (
            <File key={file.name || index} title={file.name} size={file.size} onClick={() => removeFile(file.name)} />
          ))
        ) : (
          <p className={styles.empty}>Nenhum upload feito até o momento.</p>
        )}
      </div>
    </>
  );
}
