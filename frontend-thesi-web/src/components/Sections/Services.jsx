import React, { useState } from 'react';
import Button from '../Button/Button';
import styles from './Service.module.css';

const services = [
  {
    title: 'Heuristic Evaluation',
    description: `Work on your projects by doing Heuristic Evaluation following Nielsen's guidelines!`,
    extra: 'Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.',
    image: '', // você pode colocar a URL real aqui
  },
  {
    title: 'Semiotic Inspection',
    description: `Perform thorough inspections on your own screens by following Semiotic Engineering!`,
    extra: 'Nulla vitae elit libero, a pharetra augue.',
    image: '',
  },
  {
    title: 'Assessments Listed',
    description: `Projects available at any time in your profile.`,
    extra: 'Nulla vitae elit libero, a pharetra augue.',
    image: '',
  },
  {
    title: 'Reports',
    description: `When you finish your assessment project, download a detailed report of the validations carried out by the team!`,
    extra: 'Nulla vitae elit libero, a pharetra augue.',
    image: '',
  }
];

export default function ServiceCarousel() {
  const [index, setIndex] = useState(0);
  const service = services[index];

  return (
    <div className={styles.carouselContainer}>
      
      <div className={styles.contentContainer}>
        <div className='title' >Our services</div>

        <div className={styles.indicatorRow}>

          <div className={styles.dotsContainer}>
            {services.map((_, i) => (
              <div
                key={i}
                onClick={() => setIndex(i)}
              >

                { i === index && (
                  <div className={styles.currentIndex}>
                      {String(index + 1).padStart(2, '0')}
                  </div> 
                )}

                <div  className={`${styles.dot} ${i === index ? styles.activeDot : ''}`} />
              </div>
            ))}
          </div>
        </div>

        <div className={'h3'}>{service.title}</div>
        <div className={styles.paragraph}>{service.description}</div>
        <div className={styles.paragraph}>{service.extra}</div>
        <Button variant={'primary'} >Learn more</Button>
      </div>

      <div className={styles.right}>
        <div className={styles.imagePlaceholder}></div>
      </div>
      
    </div>
  );
}
