import React, { useState } from 'react';
import { Send, ArrowRight, Loader } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormStatus {
  type: 'success' | 'error' | null;
  message: string;
}

const ContactSection = (): JSX.Element => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<FormStatus>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: 'success',
          message: 'Message envoyé ! Je vous réponds sous 24h avec des idées concrètes pour votre projet.'
        });
        setFormData({ name: '', email: '', message: '' });
        setStep(1);
      } else {
        throw new Error(data.message || 'Une erreur est survenue');
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer.'
      });
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    setStep(prevStep => prevStep + 1);
  };

  const prevStep = () => {
    setStep(prevStep => prevStep - 1);
  };

  const isStepComplete = () => {
    if (step === 1) {
      return formData.name.trim() !== '' && formData.email.trim() !== '';
    }
    if (step === 2) {
      return formData.message.trim() !== '';
    }
    return true;
  };

  return (
    <section id="contact" className="contact">
      <div className="contact__overlay"></div>
      <div className="contact__container">
        <div className="contact__form-container">
          <div className="contact__header">
            <div className="contact__badge">
              Réponse garantie sous 24h
            </div>
            <h2 className="contact__title">
              Une idée à concrétiser ensemble ?
            </h2>
            <p className="contact__description">
              Discutons de votre projet et explorons comment je peux vous aider à le réaliser plus rapidement.
            </p>
          </div>

          <div className="contact__progress">
            <div className="contact__progress-step contact__progress-step--active">
              <div className="contact__progress-number">1</div>
              <div className="contact__progress-label">Vos coordonnées</div>
            </div>
            <div className="contact__progress-line"></div>
            <div className={`contact__progress-step ${step >= 2 ? 'contact__progress-step--active' : ''}`}>
              <div className="contact__progress-number">2</div>
              <div className="contact__progress-label">Votre besoin</div>
            </div>
            <div className="contact__progress-line"></div>
            <div className={`contact__progress-step ${step >= 3 ? 'contact__progress-step--active' : ''}`}>
              <div className="contact__progress-number">3</div>
              <div className="contact__progress-label">Confirmation</div>
            </div>
          </div>

          <form className="contact__form" onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="contact__step">
                <div className="contact__form-grid">
                  <div className="contact__form-group">
                    <label className="contact__label" htmlFor="name">
                      Votre nom
                    </label>
                    <input 
                      id="name"
                      name="name"
                      type="text"
                      className="contact__input"
                      placeholder="Marie Moe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="contact__form-group">
                    <label className="contact__label" htmlFor="email">
                      Votre email
                    </label>
                    <input 
                      id="email"
                      name="email"
                      type="email"
                      className="contact__input"
                      placeholder="marie@address.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {status.type === 'success' && (
                  <div className={`contact__alert contact__alert--${status.type}`}>
                    {status.message}
                  </div>
                )}
                
                <div className="contact__button-group">
                  <button 
                    type="button" 
                    className="contact__next-button"
                    onClick={nextStep}
                    disabled={!isStepComplete()}
                  >
                    Étape suivante
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="contact__step">
                <div className="contact__form-group">
                  <label className="contact__label" htmlFor="message">
                    Parlez-moi de votre projet
                  </label>
                  <textarea 
                    id="message"
                    name="message"
                    rows={5}
                    className="contact__textarea font-sans"
                    placeholder="Décrivez votre projet, vos objectifs ou votre problématique..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />

                  <div className="contact__message-suggestions">
                    <p>Suggestions rapides :</p>
                    <div className="contact__message-chips">
                      <button 
                        type="button" 
                        className="contact__message-chip"
                        onClick={() => setFormData(prev => ({ ...prev, message: "J'ai besoin d'un site web pour présenter mon activité" }))}
                      >
                        Site vitrine
                      </button>
                      <button 
                        type="button" 
                        className="contact__message-chip"
                        onClick={() => setFormData(prev => ({ ...prev, message: "Je cherche quelqu'un pour développer une application web avec des fonctionnalités sur mesure" }))}
                      >
                        Application web
                      </button>
                      <button 
                        type="button" 
                        className="contact__message-chip"
                        onClick={() => setFormData(prev => ({ ...prev, message: "J'aimerais automatiser certains processus répétitifs dans mon entreprise" }))}
                      >
                        Automatisation
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="contact__button-group">
                  <button 
                    type="button" 
                    className="contact__back-button"
                    onClick={prevStep}
                  >
                    Retour
                  </button>
                  <button 
                    type="button" 
                    className="contact__next-button"
                    onClick={nextStep}
                    disabled={!isStepComplete()}
                  >
                    Étape suivante
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="contact__step">
                <div className="contact__summary">
                  <h3 className="contact__summary-title">Récapitulatif</h3>
                  
                  <div className="contact__summary-item">
                    <div className="contact__summary-label">Nom :</div>
                    <div className="contact__summary-value">{formData.name}</div>
                  </div>
                  
                  <div className="contact__summary-item">
                    <div className="contact__summary-label">Email :</div>
                    <div className="contact__summary-value">{formData.email}</div>
                  </div>
                  
                  <div className="contact__summary-item">
                    <div className="contact__summary-label">Message :</div>
                    <div className="contact__summary-value contact__summary-message">{formData.message}</div>
                  </div>
                </div>

                {status.type === 'error' && (
                  <div className={`contact__alert contact__alert--${status.type}`}>
                    {status.message}
                  </div>
                )}
                
                <div className="contact__button-group">
                  <button 
                    type="button" 
                    className="contact__back-button"
                    onClick={prevStep}
                    disabled={isSubmitting}
                  >
                    Retour
                  </button>
                  <button 
                    type="submit" 
                    className="contact__submit"
                    disabled={isSubmitting || !isStepComplete()}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Envoyer le message
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;