document.addEventListener('DOMContentLoaded', function() {
  const input = document.getElementById('searchInput');
  const grid = document.getElementById('productsGrid');
  const cards = Array.from(grid.querySelectorAll('.card'));
  const noResults = document.getElementById('noResults');
  const clearBtn = document.getElementById('clearBtn');

  function normalize(text){ return text.trim().toLowerCase(); }

  function filterProducts(){
    const q = normalize(input.value);
    if(!q){
      cards.forEach(c => c.style.display = '');
      noResults.hidden = true;
      clearBtn.style.display = 'none';
      return;
    }
    clearBtn.style.display = 'block';
    let visible = 0;
    cards.forEach(card => {
      const name = normalize(card.getAttribute('data-name') || card.querySelector('.card-title').innerText);
      if(name.includes(q)){
        card.style.display = '';
        visible++;
      } else {
        card.style.display = 'none';
      }
    });
    noResults.hidden = visible > 0;
  }

  input.addEventListener('input', filterProducts);
  input.addEventListener('keydown', function(e){ if(e.key === 'Escape'){ input.value=''; filterProducts(); }});
  clearBtn.addEventListener('click', function(){ input.value=''; filterProducts(); input.focus(); });
});
