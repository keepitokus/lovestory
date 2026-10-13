# Наша история

Премиальная интерактивная цифровая книга о любви Александра и Софии — демонстрация продукта платформы **«Я здесь»**.

**Название:** Наша история  
**Подзаголовок:** Всё началось с одной случайной встречи  
**Период:** 2021–2026

## Стек

- React + TypeScript + Vite
- Tailwind CSS v4
- GSAP + ScrollTrigger
- Framer Motion
- Lucide React

Контент книги вынесен в `src/data/book.ts` и редактируется без изменения JSX.

## Запуск

```bash
npm install
npm run dev
```

Откройте адрес из терминала (обычно `http://localhost:5173/lovestory/`).

## Сборка

```bash
npm run build
npm run preview
```

Сборка кладётся в `dist/`. Базовый путь — `/lovestory/` (для GitHub Pages: `https://keepitokus.github.io/lovestory/`).

### Публикация на GitHub Pages

1. `npm run build`
2. Задеплойте содержимое `dist/` в ветку `gh-pages`  
   или включите GitHub Actions / Pages из папки `/docs` после копирования `dist`.

Пример через `gh`:

```bash
npm run build
npx gh-pages -d dist
```

## Структура

```
src/
  components/     # обложка, пролог, timeline, главы, галерея, видео, аудио, письма, финал
  data/book.ts    # весь контент книги
  hooks/          # scroll progress, GSAP reveal, reduced motion
  index.css       # дизайн-система Rose
public/media/     # локальные изображения
```

## Медиа

Изображения лежат в `public/media/` (hero, meeting, first-date, together-*, travel-*, home, proposal, finale, gallery-*, video posters).

Это демо на royalty-free кадрах Unsplash. **Это не одна и та же пара на всех фото** — стоковые кадры подобраны по настроению Rose/editorial. Для клиентской книги **обязательно** замените файлы на единую фотосессию одной пары; пути и имена файлов уже готовы.

Видео и аудио:

- добавьте MP4/WebM и укажите `src` в `book.videos.items`
- добавьте аудио и раскомментируйте `src` в `book.voices.items`
- пока файлов нет, UI честно показывает демо-состояние без ложного воспроизведения

## Что внутри

- Полноэкранная обложка с появлением
- Пролог «До тебя» с двумя путями
- Интерактивная хронология
- 6 глав + эпилог с разными композициями
- Галерея «Наши моменты» + lightbox (клавиатура, свайпы)
- Видео-постеры под будущие файлы
- Аудиокарточки «Твой голос»
- Интерактивные письма
- Финал с подписью «Я здесь»
- Навигация + индикатор прогресса чтения
- `prefers-reduced-motion`
