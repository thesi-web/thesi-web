import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import styles from './Service.module.css';

const services = [
  {
    title: 'Heuristic Evaluation',
    description: `Work on your projects by doing Heuristic Evaluation following Nielsen's guidelines!`,
    extra: 'Identify usability issues early and improve your product through expert-driven feedback.',
    image: '',
  },
  {
    title: 'Semiotic Inspection',
    description: `Perform thorough inspections on your own screens by following Semiotic Engineering!`,
    extra: 'Understand how users interpret your interface and refine your design communication strategies.',
    image: '',
  },
  {
    title: 'Assessments Listed',
    description: `Projects available at any time in your profile.`,
    extra: 'Access past evaluations and track progress with ease — everything stays organized in one place.',
    image: '',
  },
  {
    title: 'Reports',
    description: `When you finish your assessment project, download a detailed report of the validations carried out by the team!`,
    extra: 'Receive structured, downloadable reports to share results, insights, and next steps with stakeholders.',
    image: '',
  }
];


export default function ServiceCarousel() {
  const [index, setIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const service = services[index];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setIndex(prev => (prev + 1) % services.length);
        setIsFading(false);
      }, 400);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.carouselContainer}>
      
      <div className={styles.contentContainer}>
        <div className='title'>Our services</div>

        <div className={`${styles.animatedBlock} ${isFading ? styles.fadeOut : ''}`}>
          <div className={styles.indicatorRow}>
            <div className={styles.dotsContainer}>
              {services.map((_, i) => (
                <div key={i} onClick={() => {
                  setIsFading(true);
                  setTimeout(() => {
                    setIndex(i);
                    setIsFading(false);
                  }, 300);
                }}>
                  {i === index && (
                    <div className={styles.currentIndex}>
                      {String(index + 1).padStart(2, '0')}
                    </div> 
                  )}
                  <div className={`${styles.dot} ${i === index ? styles.activeDot : ''}`} />
                </div>
              ))}
            </div>
          </div>

          <div className={'h3'}>{service.title}</div>
          <div className={styles.paragraph}>{service.description}</div>
          <div className={styles.paragraph}>{service.extra}</div>
        </div>
        <Button variant={'primary'}>Learn more</Button>
      </div>

      <div className={styles.right}>
        <div className={styles.imagePlaceholder}></div>
      </div>
      
    </div>
  );
}
