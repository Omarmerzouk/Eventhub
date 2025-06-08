// Templates pour les événements
export const eventTemplates = {
    // Template pour une carte d'événement
    eventCard: (event) => `
        <div class="event-card" onclick="openEventModal(${event.id})">
            <img src="${event.image}" alt="${event.title}" class="event-image">
            <div class="event-content">
                <div class="event-header">
                    <span class="event-type">${event.type}</span>
                    <span class="event-format ${event.format === 'Présentiel' ? 'format-presentiel' : 'format-enligne'}">
                        ${event.format}
                    </span>
                </div>
                <h3 class="event-title">${event.title}</h3>
                <p class="event-description">${event.description}</p>
                <div class="event-details">
                    <div class="event-detail">
                        <i class="fas fa-calendar"></i>
                        <span>${event.date}</span>
                    </div>
                    <div class="event-detail">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${event.location}</span>
                    </div>
                    <div class="event-detail">
                        <i class="fas fa-users"></i>
                        <span>${event.participants} participants</span>
                    </div>
                </div>
                <div class="event-footer">
                    <div class="event-rating">
                        <span>⭐</span>
                        <span>${event.rating}</span>
                        <span style="color: #6b7280; font-size: 14px;">(${event.reviews} avis)</span>
                    </div>
                    <div class="event-price">${event.price}</div>
                </div>
            </div>
        </div>
    `,

    // Template pour le modal d'événement
    eventModal: (event) => {
        let commentsHtml = '';
        if (event.comments && event.comments.length > 0) {
            commentsHtml += '<div style="margin-top: 30px;"><h4>Commentaires :</h4><ul>';
            event.comments.forEach(c => {
                commentsHtml += `<li style="margin-bottom: 10px; color: #374151;">🗨️ ${c}</li>`;
            });
            commentsHtml += '</ul></div>';
        }

        return `
            <input type="hidden" id="eventId" value="${event.id}">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                <div>
                    <img src="${event.image}" alt="${event.title}" style="width: 100%; height: 250px; object-fit: cover; border-radius: 8px;">

                    <!-- Formulaire commentaire + note -->
                    <div style="margin-top: 20px; background: #f9fafb; padding: 15px; border-radius: 8px;">
                        <h4 style="margin-bottom: 10px;">Laissez un commentaire</h4>
                        <textarea id="comment" placeholder="Écrivez votre avis ici..." style="width: 100%; height: 80px; padding: 8px; margin-bottom: 10px; border-radius: 5px; border: 1px solid #ccc;"></textarea>
                        <select id="rating" style="width: 100%; padding: 8px; margin-bottom: 10px; border-radius: 5px; border: 1px solid #ccc;">
                            <option value="5">5 ⭐⭐⭐⭐⭐</option>
                            <option value="4">4 ⭐⭐⭐⭐</option>
                            <option value="3">3 ⭐⭐⭐</option>
                            <option value="2">2 ⭐⭐</option>
                            <option value="1">1 ⭐</option>
                        </select>
                        <button onclick="submitComment()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 5px;">Envoyer</button>
                        <div id="commentList" style="margin-top: 15px;">${commentsHtml}</div>
                    </div>
                </div>
                <div>
                    <h3 style="font-size: 24px; margin-bottom: 15px; color: #1f2937;">${event.title}</h3>
                    <p style="color: #6b7280; margin-bottom: 20px; line-height: 1.6;">${event.description}</p>
                    
                    <div style="margin-bottom: 20px;">
                        <div style="display: flex; align-items: center; margin-bottom: 10px;">
                            <i class="fas fa-calendar" style="width: 20px; margin-right: 10px; color: #6b7280;"></i>
                            <span>${event.date}</span>
                        </div>
                        <div style="display: flex; align-items: center; margin-bottom: 10px;">
                            <i class="fas fa-map-marker-alt" style="width: 20px; margin-right: 10px; color: #6b7280;"></i>
                            <span>${event.location}</span>
                        </div>
                        <div style="display: flex; align-items: center; margin-bottom: 10px;">
                            <i class="fas fa-users" style="width: 20px; margin-right: 10px; color: #6b7280;"></i>
                            <span>${event.participants} participants</span>
                        </div>
                        <div style="display: flex; align-items: center; margin-bottom: 10px;">
                            <i class="fas fa-building" style="width: 20px; margin-right: 10px; color: #6b7280;"></i>
                            <span>Organisé par ${event.organizer}</span>
                        </div>
                    </div>
                    
                    <div style="display: flex; align-items: center; margin-bottom: 20px;">
                        <span style="color: #fbbf24; margin-right: 5px;">⭐</span>
                        <span style="font-weight: 600; font-size: 18px;">${event.rating}</span>
                        <span style="color: #6b7280; margin-left: 5px;">(${event.reviews} avis)</span>
                    </div>
                    
                    <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                        <span style="background: ${event.format === 'Présentiel' ? '#10b981' : '#3b82f6'}; color: white; padding: 6px 12px; border-radius: 6px; font-size: 14px;">
                            ${event.format}
                        </span>
                        <span style="background: #f3f4f6; color: #374151; padding: 6px 12px; border-radius: 6px; font-size: 14px;">
                            ${event.type}
                        </span>
                    </div>
                    
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 30px;">
                        <div style="font-size: 28px; font-weight: bold; color: #059669;">${event.price}</div>
                        <button onclick="reserveEvent()" class="btn-primary" style="padding: 12px 24px; font-size: 16px;">
                            Réserver ma place
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
};