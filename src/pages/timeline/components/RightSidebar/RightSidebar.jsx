import React from 'react';
import { FirstCard, FirstButton } from '../../../../components'; // Assuming components are exported from index

function RightSidebar() {
  // Example suggestion data
  const suggestions = [...Array(6)].map((_, i) => ({ id: i, user: `bernardovxa${i + 1}` }));

  return (
    <aside className="w-1/5 p-4 bg-gray-100 hidden lg:block"> {/* Added hidden lg:block for responsiveness */}
      <div className="sticky top-4"> {/* Added sticky top-4 */}
        <h2 className="text-lg font-bold mb-4">Sugestão pra seguir</h2>
        <div className="flex flex-col gap-3"> {/* Added gap for spacing between cards */}
          {suggestions.map((suggestion) => (
            <FirstCard key={suggestion.id}>
              <div className="flex justify-between items-center gap-2 flex-wrap">
                <div className="flex items-center gap-2 overflow-hidden"> {/* Added overflow-hidden */}
                  <div className="w-8 h-8 rounded-full bg-gray-400 flex-shrink-0" /> {/* Added flex-shrink-0 */}
                  <span className="truncate text-sm">@{suggestion.user}</span> {/* Adjusted text size */}
                </div>
                <FirstButton texto="Seguir" cor="#00695C" tamanho="0.75rem" padding="px-2 py-1" /> {/* Adjusted size/padding */}
              </div>
            </FirstCard>
          ))}
        </div>
      </div>
    </aside>
  );
}

export { RightSidebar };