import React from 'react';

import {
    FirstCard,
    SportButton,
} from '../../components';
import { FirstSubTitleWithProfile } from '../FirstSubTitleWithProfile/FirstSubTitleWithProfile';

// Recebe os posts e a opção showUserProfile como props
function CentralFeed({ posts = [], showUserProfile = true }) {
    // Se não houver posts, pode mostrar uma mensagem ou retornar null
    // if (!posts || posts.length === 0) { // Removido para simplificar, mas pode ser útil
    //   return <div className="w-full md:w-3/5 p-4"><p>Nenhuma publicação encontrada.</p></div>;
    // }

    return (
        <div className="flex justify-center">
            <div className="w-full md:w-4/5 p-4 flex flex-col gap-4">
                {posts.map(item => (
                    <div className="min-w-[300px]">
                        <FirstCard key={item.id}>
                            <div className="flex flex-col gap-2">
                                {showUserProfile && <FirstSubTitleWithProfile texto={item.user} imagemUrl={item.img} />}
                                <div className="bg-gray-300 h-64 rounded-md flex items-center justify-center text-gray-500">
                                    imagem/vídeo aqui
                                </div>
                                <p className="text-sm text-gray-700">{item.description}</p>
                                <div className="flex gap-2 flex-wrap">
                                    {item.sports.map(sport => <SportButton key={sport} label={sport} selected={true} />)}
                                </div>
                            </div>
                        </FirstCard>
                    </div>
                ))}
            </div>
        </div>
    );
}

export { CentralFeed };