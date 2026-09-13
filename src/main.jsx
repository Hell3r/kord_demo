import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const heroImage = 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1600&q=85'
const workshopImage = 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1200&q=85'

const icons = {
  pin: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>,
  phone: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 16.5v2a2 2 0 0 1-2.2 2A17.7 17.7 0 0 1 4 5.2 2 2 0 0 1 6 3h2a2 2 0 0 1 2 1.7c.1.7.3 1.4.6 2a2 2 0 0 1-.5 2.1L9.2 10a14 14 0 0 0 4.8 4.8l1.2-.9a2 2 0 0 1 2.1-.5c.6.3 1.3.5 2 .6a2 2 0 0 1 1.7 2.5Z"/></svg>,
  arrow: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg>,
  arrowUp: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 15 6-6 6 6"/></svg>,
  menu: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>,
  close: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>,
  calendar: <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="16" rx="2"/><path d="M7 3v4M17 3v4M3.5 10h17M8 14h.01M12 14h.01M16 14h.01M8 17.5h.01M12 17.5h.01"/></svg>,
  shield: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s8-3.7 8-10V5l-8-3-8 3v6c0 6.3 8 10 8 10Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></svg>,
  gear: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 1.2 2.5 2.7.5 2.1-1.5 2 2-1.5 2.1.5 2.7L21.5 12 19 13.2l-.5 2.7 1.5 2.1-2 2-2.1-1.5-2.7.5L12 21.5l-1.2-2.5-2.7-.5L6 20l-2-2 1.5-2.1-.5-2.7L2.5 12 5 10.8l.5-2.7L4 6l2-2 2.1 1.5 2.7-.5L12 2Z"/><circle cx="12" cy="12" r="3"/></svg>,
  badge: <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="m9 12-1 9 4-2 4 2-1-9M10.5 8h3"/></svg>,
  clock: <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>,
  engine: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10h3l2-3h5l2 3h2a2 2 0 0 1 2 2v5H4v-7ZM7 17v2M17 17v2M9 10h5"/><path d="M21 12h1v3h-1"/></svg>,
  wrench: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.7 6.3a4.3 4.3 0 0 0-5.5 5.5L3.5 17.5a2.1 2.1 0 1 0 3 3l5.7-5.7a4.3 4.3 0 0 0 5.5-5.5l-2.6 2.1-2.1-2.1 1.7-3Z"/></svg>,
  drop: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3S5 11 5 15a7 7 0 0 0 14 0c0-4-7-12-7-12Z"/><path d="M9 16a3 3 0 0 0 3 3"/></svg>,
  tire: <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 4v5M20 12h-5M12 20v-5M4 12h5"/></svg>,
  check: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>,
}

const services = [
  { icon: 'engine', title: 'Компьютерная диагностика', text: 'Проверка всех систем автомобиля', price: 'от 1 000 ₽', image: 'https://images.unsplash.com/photo-1632823469850-1f77c8e3c8b5?auto=format&fit=crop&w=700&q=80' },
  { icon: 'drop', title: 'Замена масла', text: 'Любое масло и фильтры', price: 'от 800 ₽', image: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&w=700&q=80' },
  { icon: 'wrench', title: 'Ремонт тормозной системы', text: 'Диагностика и замена деталей', price: 'от 1 500 ₽', image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=700&q=80' },
  { icon: 'tire', title: 'Шиномонтаж', text: 'Балансировка, сезонная смена', price: 'от 800 ₽', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=700&q=80' },
]

const advantages = [
  { icon: 'shield', title: 'Опытные мастера', text: 'Наши специалисты имеют многолетний опыт работы с автомобилями любых марок.' },
  { icon: 'gear', title: 'Современное оборудование', text: 'Используем профессиональное оборудование для точной диагностики и качественного ремонта.' },
  { icon: 'badge', title: 'Гарантия на работы', text: 'Предоставляем гарантию на все виды выполненных работ.' },
  { icon: 'clock', title: 'Удобная запись', text: 'Запишитесь онлайн или по телефону. Подберём удобное время для вас.' },
]

function Icon({ name }) { return icons[name] }

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState('')
  const [sent, setSent] = useState(false)
  const [reviewIndex, setReviewIndex] = useState(0)

  const openBooking = (service = '') => {
    setSelectedService(service)
    setSent(false)
    setModalOpen(true)
    setMenuOpen(false)
  }

  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const submitBooking = (event) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <div className="app-shell">
      <div className="topline"><span className="green-dot" /> ОТКРЫТЫ ЕЖЕДНЕВНО <span className="topline-separator">•</span> 08:00—21:00 <span className="topline-city">ЧЕБОКСАРЫ</span></div>
      <header className="header">
        <button className="logo" onClick={() => goTo('top')} aria-label="На главную"><span>КОРД</span><small>АВТОСЕРВИС</small></button>
        <button className="location" onClick={() => goTo('contacts')}><Icon name="pin" /> Чебоксары <span className="chevron">⌄</span></button>
        <nav className={menuOpen ? 'nav nav-open' : 'nav'}>
          <button onClick={() => goTo('services')}>Услуги</button>
          <button onClick={() => goTo('about')}>О нас</button>
          <button onClick={() => goTo('advantages')}>Преимущества</button>
          <button onClick={() => goTo('reviews')}>Отзывы</button>
          <button onClick={() => goTo('contacts')}>Контакты</button>
        </nav>
        <div className="header-right">
          <a className="phone-link" href="tel:+79276666383"><Icon name="phone" /><span><b>+7 (927) 666-63-83</b><small>Пн—Вс 08:00—21:00</small></span></a>
          <button className="btn btn-outline header-book" onClick={() => openBooking()}>Записаться</button>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}><Icon name={menuOpen ? 'close' : 'menu'} /></button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-mark">▰</span> АВТОСЕРВИС В ЧЕБОКСАРАХ</p>
            <h1>Надёжный сервис<br />для вашего автомобиля</h1>
            <p className="hero-description">Диагностика, ремонт и обслуживание автомобилей всех марок. Современное оборудование, опытные мастера и гарантия на все виды работ.</p>
            <div className="hero-actions"><button className="btn btn-primary" onClick={() => openBooking()}>Записаться на обслуживание <Icon name="calendar" /></button><a className="btn btn-ghost" href="tel:+79276666383"><Icon name="phone" /> Позвонить</a></div>
            <div className="hero-note"><span className="note-line" /> Бережно относимся к вашему автомобилю</div>
          </div>
          <div className="hero-visual" style={{ '--hero-image': `url(${heroImage})` }}><div className="hero-glow" /><div className="hero-badge"><strong>10+</strong><span>лет заботимся<br />об автомобилях</span></div></div>
        </section>

        <section className="quick-services" aria-label="Основные услуги">
          {services.slice(0, 4).map((item) => <button className="quick-service" key={item.title} onClick={() => openBooking(item.title)}><span className="service-icon"><Icon name={item.icon} /></span><span>{item.title}</span><Icon name="arrow" /></button>)}
        </section>

        <section className="section advantages" id="advantages">
          <div className="section-heading"><p className="eyebrow">ПОЧЕМУ ВЫБИРАЮТ КОРД</p><h2>Работаем так, чтобы<br /><em>возвращались</em> снова</h2><p className="section-lead">Честно объясняем, что происходит с автомобилем, и делаем только то, что действительно нужно.</p></div>
          <div className="advantage-grid">{advantages.map((item, index) => <article className="advantage" key={item.title}><span className="advantage-number">0{index + 1}</span><span className="advantage-icon"><Icon name={item.icon} /></span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
        </section>

        <section className="section dark-section" id="services">
          <div className="section-bar"><div><p className="eyebrow">ЧТО МЫ ДЕЛАЕМ</p><h2>Популярные услуги</h2></div><button className="text-link" onClick={() => openBooking()}>Все услуги <Icon name="arrow" /></button></div>
          <div className="service-grid">{services.map((item) => <button className="service-card" key={item.title} onClick={() => openBooking(item.title)}><div className="service-image" style={{ backgroundImage: `url(${item.image})` }}><span className="service-card-icon"><Icon name={item.icon} /></span></div><div className="service-card-body"><h3>{item.title}</h3><p>{item.text}</p><strong>{item.price}</strong><span className="round-arrow"><Icon name="arrow" /></span></div></button>)}</div>
        </section>

        <section className="section about" id="about">
          <div className="about-image" style={{ backgroundImage: `url(${workshopImage})` }}><span className="image-label"><span className="green-dot" /> КОРД / ЧЕБОКСАРЫ</span></div>
          <div className="about-copy"><p className="eyebrow">О НАС</p><h2>Сервис, которому<br /><em>доверяют</em></h2><p>КОРД — это современный автосервис в Чебоксарах, где ценят ваше время и заботятся о вашем автомобиле. Мы поддерживаем высокий стандарт качества, регулярно обновляем оборудование и развиваем технологии.</p><button className="btn btn-primary" onClick={() => goTo('contacts')}>Подробнее о нас <Icon name="arrow" /></button><div className="stats"><div><strong>10+</strong><span>лет опыта работы</span></div><div><strong>1000+</strong><span>довольных клиентов</span></div><div><strong>Все</strong><span>марки автомобилей</span></div></div></div>
        </section>

        <section className="section reviews" id="reviews">
          <div className="section-bar"><div><p className="eyebrow">ОТЗЫВЫ КЛИЕНТОВ</p><h2>Нам доверяют</h2></div><div className="review-controls"><button onClick={() => setReviewIndex((reviewIndex + 2) % 3)} aria-label="Предыдущий отзыв">←</button><button onClick={() => setReviewIndex((reviewIndex + 1) % 3)} aria-label="Следующий отзыв">→</button></div></div>
          <div className="review-layout"><div className="review-feature"><span className="quote-mark">“</span><p>{['Приезжаю в КОРД уже не первый год. Всегда всё по делу: быстро находят проблему, объясняют варианты и не навязывают лишнего. Отдельное спасибо за отношение к клиентам.', 'Отличный сервис и очень спокойная атмосфера. Записался онлайн, машину приняли вовремя, а все работы показали на видео. Теперь обслуживаю только здесь.', 'Понравилось современное оборудование и внимательные мастера. Сделали диагностику за час, подробно рассказали о состоянии автомобиля. Рекомендую.'][reviewIndex]}</p><div className="review-author"><span className="avatar">{['АК', 'МС', 'ДВ'][reviewIndex]}</span><span><strong>{['Алексей К.', 'Марина С.', 'Дмитрий В.'][reviewIndex]}</strong><small>{['BMW 5 series', 'Kia Sportage', 'Toyota Camry'][reviewIndex]}</small></span><span className="stars">★★★★★</span></div></div><div className="review-promise"><p className="eyebrow">НАША ФИЛОСОФИЯ</p><h3>Качественный ремонт начинается с честного диалога.</h3><p>Показываем результаты диагностики, согласовываем стоимость до начала работ и всегда остаёмся на связи.</p><span className="promise-line" /></div></div>
        </section>

        <section className="cta-section"><div><p className="eyebrow">ГОТОВЫ ПОМОЧЬ</p><h2>Пора позаботиться<br />об автомобиле?</h2></div><button className="btn btn-primary" onClick={() => openBooking()}>Записаться на обслуживание <Icon name="arrow" /></button></section>

        <section className="contacts section" id="contacts"><div className="contacts-info"><p className="eyebrow">КОНТАКТЫ</p><h2>Заезжайте<br /><em>в гости</em></h2><div className="contact-list"><a href="tel:+79276666383"><span className="contact-icon"><Icon name="phone" /></span><span><small>Телефон</small><strong>+7 (927) 666-63-83</strong></span></a><div><span className="contact-icon"><Icon name="pin" /></span><span><small>Адрес</small><strong>г. Чебоксары,<br />ул. Промышленная, 12</strong></span></div><div><span className="contact-icon"><Icon name="clock" /></span><span><small>Режим работы</small><strong>Ежедневно, 08:00—21:00</strong></span></div></div><button className="btn btn-outline light" onClick={() => openBooking()}>Записаться онлайн <Icon name="arrow" /></button></div><div className="map-card"><div className="map-grid" /><div className="map-road road-one" /><div className="map-road road-two" /><div className="map-pin"><Icon name="pin" /></div><div className="map-label"><strong>КОРД</strong><span>Автосервис</span></div><button className="map-route" onClick={() => window.open('https://yandex.ru/maps/', '_blank')}>Построить маршрут <Icon name="arrow" /></button></div></section>
      </main>

      <footer className="footer"><button className="logo" onClick={() => goTo('top')}><span>КОРД</span><small>АВТОСЕРВИС</small></button><p>Современный автосервис<br />в Чебоксарах</p><span className="footer-copy">© 2026 КОРД. Концепт сайта.</span><button className="to-top" onClick={() => goTo('top')} aria-label="Наверх"><Icon name="arrowUp" /></button></footer>

      {modalOpen && <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setModalOpen(false)}><div className="booking-modal"><button className="modal-close" onClick={() => setModalOpen(false)} aria-label="Закрыть"><Icon name="close" /></button>{sent ? <div className="success-state"><span className="success-icon"><Icon name="check" /></span><p className="eyebrow">ДЕМО-СЦЕНАРИЙ</p><h2>Заявка подготовлена</h2><p>Спасибо! В рабочей версии менеджер свяжется с вами для подтверждения времени.</p><button className="btn btn-primary" onClick={() => setModalOpen(false)}>Понятно</button></div> : <><p className="eyebrow">ЗАПИСЬ НА СЕРВИС</p><h2>Оставьте заявку</h2><p className="modal-lead">Выберите удобное время — мы перезвоним и всё подтвердим.</p><form onSubmit={submitBooking}><label>Ваше имя<input required placeholder="Как к вам обращаться?" /></label><label>Телефон<input required type="tel" placeholder="+7 (___) ___-__-__" /></label><label>Что нужно сделать<select value={selectedService} onChange={(event) => setSelectedService(event.target.value)}><option value="">Выберите услугу</option>{services.map((item) => <option key={item.title}>{item.title}</option>)}<option>Другая задача</option></select></label><label>Желаемая дата<input type="date" /></label><button className="btn btn-primary full" type="submit">Отправить заявку <Icon name="arrow" /></button><small className="form-note">Нажимая кнопку, вы соглашаетесь на обработку данных</small></form></>}</div></div>}
    </div>
  )
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
