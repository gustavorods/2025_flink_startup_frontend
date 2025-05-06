import React from 'react';

import {
  FirstCard,
  SportButton,
} from '../../../../components'; // Assuming components are exported from index
import { FirstSubTitleWithProfile } from '../FirstSubTitleWithProfile/FirstSubTitleWithProfile'; // Adjust path if needed

function CentralFeed() {
  // You might want to fetch actual feed data here later
  const feedItems = [
    { id: 1, user: 'bernardovxexra', img: 'https://via.placeholder.com/150', description: 'Descrição descrição descrição descrição descrição hfhfahfseusefuseisef shfseufseufh', sports: ['Futebol', 'Vôlei'] },
    // Add more feed items as needed
  ];

  return (
    <main className="w-full md:w-3/5 p-4 flex flex-col gap-4"> {/* Adjusted width for responsiveness */}
      {feedItems.map(item => (
        <FirstCard key={item.id}>
          <div className="flex flex-col gap-2">
            <FirstSubTitleWithProfile texto={item.user} imagemUrl={item.img} />
            <div className="bg-gray-300 h-64 rounded-md flex items-center justify-center text-gray-500">
              imagem/vídeo aqui
            </div>
            <p className="text-sm text-gray-700">{item.description}</p>
            <div className="flex gap-2 flex-wrap"> {/* Added flex-wrap */}
              {item.sports.map(sport => <SportButton key={sport} label={sport} selected={true} />)}
            </div>
          </div>
        </FirstCard>
      ))}
    </main>
  );
}

export { CentralFeed };