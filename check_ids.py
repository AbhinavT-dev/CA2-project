ids_needed = [
    'mobile-menu-btn','mobile-menu','water-canvas','btn-sim-polluted','btn-sim-clean',
    'sim-status-badge','sim-particle-count','scale-slider','scale-name','scale-size',
    'scale-example','scale-danger','scale-visual-circle','calc-bottled','calc-tap',
    'calc-boil','calc-filter','calc-kettle','calc-teabags','btn-calculate-risk',
    'calc-result-card','res-weekly','res-annual','res-cards','res-advice','res-level-badge',
    'filter-matrix-cards','quiz-container','quiz-question','quiz-options','quiz-feedback',
    'quiz-next-btn','quiz-progress','quiz-count','dot-python','text-python','dot-java','text-java'
]

with open('index.html', encoding='utf-8') as f:
    html = f.read()

missing = [i for i in ids_needed if f'id="{i}"' not in html]
found = [i for i in ids_needed if f'id="{i}"' in html]
print(f"Found: {len(found)}/{len(ids_needed)}")
if not missing:
    print("ALL IDs FOUND - Zero errors!")
else:
    print("MISSING:", missing)

