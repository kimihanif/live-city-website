import { useEffect, useState } from 'react';

interface Props {
  categories: string[];
  selector: string;
  initial?: string;
}

export function ChipFilter({ categories, selector, initial = 'All' }: Props) {
  const [active, setActive] = useState(initial);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(selector);
    elements.forEach((el) => {
      const cat = el.dataset.category ?? '';
      const matches = active === 'All' || cat.toLowerCase() === active.toLowerCase();
      el.style.display = matches ? '' : 'none';
    });
  }, [active, selector]);

  return (
    <div className="chips">
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          className={`chip ${active === cat ? 'active' : ''}`}
          onClick={() => setActive(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
