import React, { useState } from 'react';

export default function About() {
  // Swiper images: 6 images of people adopting pets (from Pexels, real people with pets)
  const adoptionImages = [
    'https://images.pexels.com/photos/6568492/pexels-photo-6568492.jpeg?auto=compress&cs=tinysrgb&w=600', // woman with dog
    'https://images.pexels.com/photos/2215599/pexels-photo-2215599.jpeg?auto=compress&cs=tinysrgb&w=600', // man with dog
    'https://images.pexels.com/photos/8498519/pexels-photo-8498519.jpeg?auto=compress&cs=tinysrgb&w=600', // woman with cat
    'https://images.pexels.com/photos/9783906/pexels-photo-9783906.jpeg?auto=compress&cs=tinysrgb&w=600', // girl with dog
    'https://images.pexels.com/photos/9428963/pexels-photo-9428963.jpeg?auto=compress&cs=tinysrgb&w=600', // woman with cat
    'https://images.pexels.com/photos/7474345/pexels-photo-7474345.jpeg?auto=compress&cs=tinysrgb&w=600', // man with dog
  ];
  const [current, setCurrent] = useState(0);
  const total = adoptionImages.length;
  // Show 3 images at a time, centered
  const getVisibleImages = () => {
    if (total <= 3) return adoptionImages;
    const prev = (current - 1 + total) % total;
    const next = (current + 1) % total;
    return [adoptionImages[prev], adoptionImages[current], adoptionImages[next]];
  };
  const goLeft = () => setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1));
  const goRight = () => setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));

  return (
    <div className="about-page" style={{ background: '#f4fbf6', minHeight: '100vh', width: '100%' }}>
      {/* Hero Section */}
      <section style={{ width: '100%', padding: '64px 0 32px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(90deg, #e8f5e9 0%, #f4fbf6 100%)' }}>
        <div style={{ maxWidth: 1200, width: '100%', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 48, justifyContent: 'space-between', margin: '0 32px' }}>
          <div style={{ flex: 1, minWidth: 320 }}>
            <h1 style={{ fontSize: 44, fontWeight: 900, color: '#27AE60', marginBottom: 16 }}>About Adopt & Adore</h1>
            <p style={{ color: '#333', fontSize: 22, marginBottom: 24, fontWeight: 500, lineHeight: 1.5 }}>
              Connecting loving families with pets in need since 2020. <br />
              <span style={{ color: '#27AE60', fontWeight: 700 }}>Adopt & Adore</span> is your trusted platform for finding, adopting, and loving pets from shelters and rescues.
            </p>
          </div>
          <div style={{ flex: 1, minWidth: 320, display: 'flex', justifyContent: 'center' }}>
            <img src="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&w=600&h=400&fit=crop" alt="Adopt & Adore" style={{ borderRadius: 18, width: '100%', maxWidth: 420, objectFit: 'cover', boxShadow: '0 2px 16px rgba(68,119,68,0.10)' }} />
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section style={{ maxWidth: 1100, margin: '48px auto 0 auto', padding: '0 24px' }}>
        <h2 style={{ color: '#27AE60', fontWeight: 800, fontSize: 32, marginBottom: 12 }}>Our Mission</h2>
        <p style={{ color: '#444', fontSize: 18, lineHeight: 1.7, marginBottom: 32 }}>
          At <b>Adopt & Adore</b>, we believe every pet deserves a loving home and every family deserves the joy of a furry companion. Our mission is to connect caring individuals and families with pets from shelters and rescue organizations, making the adoption process simple, transparent, and rewarding.
        </p>
        <h2 style={{ color: '#27AE60', fontWeight: 800, fontSize: 32, marginBottom: 12 }}>Our Values</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, marginBottom: 32 }}>
          <div style={{ flex: 1, minWidth: 220 }}>
            <h3 style={{ color: '#27AE60', fontWeight: 700, fontSize: 22, marginBottom: 6 }}>❤️ Compassion</h3>
            <p style={{ color: '#444', fontSize: 16, lineHeight: 1.7 }}>Every pet deserves love, care, and a second chance at happiness. We approach every adoption with empathy and understanding.</p>
          </div>
          <div style={{ flex: 1, minWidth: 220 }}>
            <h3 style={{ color: '#27AE60', fontWeight: 700, fontSize: 22, marginBottom: 6 }}>🤝 Trust</h3>
            <p style={{ color: '#444', fontSize: 16, lineHeight: 1.7 }}>We build lasting relationships based on honesty, transparency, and reliable service for both pets and adopters.</p>
          </div>
          <div style={{ flex: 1, minWidth: 220 }}>
            <h3 style={{ color: '#27AE60', fontWeight: 700, fontSize: 22, marginBottom: 6 }}>🌞 Joy</h3>
            <p style={{ color: '#444', fontSize: 16, lineHeight: 1.7 }}>Every adoption brings joy to both pet and family, creating memories that last a lifetime.</p>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section style={{ width: '100%', background: '#e8f5e9', padding: '48px 0', margin: '48px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
          <div style={{ flex: 2, minWidth: 320 }}>
            <h2 style={{ color: '#27AE60', fontWeight: 800, fontSize: 32, marginBottom: 12 }}>Our Impact</h2>
            <ul style={{ color: '#444', fontSize: 18, lineHeight: 1.7, listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: 10 }}><b>5,000+</b> pets adopted</li>
              <li style={{ marginBottom: 10 }}><b>50+</b> partner shelters</li>
              <li style={{ marginBottom: 10 }}><b>15,000+</b> happy families</li>
              <li><b>24/7</b> support available</li>
            </ul>
          </div>
          <div style={{ flex: 1, minWidth: 260, display: 'flex', justifyContent: 'center' }}>
            <img src="https://images.pexels.com/photos/5732491/pexels-photo-5732491.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Happy pets" style={{ borderRadius: 14, width: '100%', maxWidth: 320, objectFit: 'cover', boxShadow: '0 2px 16px rgba(68,119,68,0.10)' }} />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 48px 24px' }}>
        <h2 style={{ color: '#27AE60', fontWeight: 800, fontSize: 32, marginBottom: 12 }}>How Adopt & Adore Works</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
          <div style={{ flex: 1, minWidth: 220 }}>
            <h3 style={{ color: '#27AE60', fontWeight: 700, fontSize: 20, marginBottom: 6 }}>🔍 Easy Search</h3>
            <p style={{ color: '#444', fontSize: 16, lineHeight: 1.7 }}>Find your perfect pet with our advanced filtering system based on your preferences and lifestyle.</p>
          </div>
          <div style={{ flex: 1, minWidth: 220 }}>
            <h3 style={{ color: '#27AE60', fontWeight: 700, fontSize: 20, marginBottom: 6 }}>📋 Thorough Screening</h3>
            <p style={{ color: '#444', fontSize: 16, lineHeight: 1.7 }}>All pets are healthy, vaccinated, and ready for adoption through comprehensive health checks.</p>
          </div>
          <div style={{ flex: 1, minWidth: 220 }}>
            <h3 style={{ color: '#27AE60', fontWeight: 700, fontSize: 20, marginBottom: 6 }}>🏡 Post-Adoption Support</h3>
            <p style={{ color: '#444', fontSize: 16, lineHeight: 1.7 }}>We provide ongoing support and resources to help you and your new pet adjust to life together.</p>
          </div>
          <div style={{ flex: 1, minWidth: 220 }}>
            <h3 style={{ color: '#27AE60', fontWeight: 700, fontSize: 20, marginBottom: 6 }}>💸 Transparent Pricing</h3>
            <p style={{ color: '#444', fontSize: 16, lineHeight: 1.7 }}>All adoption fees are clearly displayed, covering vaccinations, spaying/neutering, and medical care.</p>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 48px 24px' }}>
        <h2 style={{ color: '#27AE60', fontWeight: 800, fontSize: 32, marginBottom: 12 }}>Our Technology</h2>
        <p style={{ color: '#444', fontSize: 18, lineHeight: 1.7, marginBottom: 24 }}>
          Adopt & Adore leverages the latest web technologies to provide a seamless, secure, and fast experience for both adopters and shelters. Our platform uses real-time updates, advanced search, and secure authentication to make pet adoption easy and trustworthy.
        </p>
      </section>

      {/* Community Events Section */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 48px 24px' }}>
        <h2 style={{ color: '#27AE60', fontWeight: 800, fontSize: 32, marginBottom: 12 }}>Community Events</h2>
        <p style={{ color: '#444', fontSize: 18, lineHeight: 1.7, marginBottom: 24 }}>
          We regularly host adoption drives, pet care workshops, and community meetups to bring together pet lovers and help more animals find loving homes. Join our next event and be part of the Adopt & Adore family!
        </p>
      </section>

      {/* Testimonials Section */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 48px 24px' }}>
        <h2 style={{ color: '#27AE60', fontWeight: 800, fontSize: 32, marginBottom: 12 }}>Testimonials</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center' }}>
          <div style={{ flex: 1, minWidth: 260, background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(68,119,68,0.07)', padding: 24 }}>
            <p style={{ color: '#444', fontSize: 16, fontStyle: 'italic', marginBottom: 12 }}>
              "Adopt & Adore made the adoption process so easy and joyful. We found our best friend!"
            </p>
            <span style={{ color: '#27AE60', fontWeight: 700 }}>— Anjali & Bruno</span>
          </div>
          <div style={{ flex: 1, minWidth: 260, background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(68,119,68,0.07)', padding: 24 }}>
            <p style={{ color: '#444', fontSize: 16, fontStyle: 'italic', marginBottom: 12 }}>
              "The community events are amazing. We learned so much about pet care and met wonderful people."
            </p>
            <span style={{ color: '#27AE60', fontWeight: 700 }}>— Rohan & Family</span>
          </div>
        </div>
      </section>

      {/* Adoption Moments Swiper */}
      <section style={{ maxWidth: 1100, margin: '48px auto', padding: '0 24px' }}>
        <h2 style={{ color: '#27AE60', fontWeight: 800, fontSize: 32, marginBottom: 12 }}>Adoption Moments</h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, position: 'relative', minHeight: 320 }}>
          <button onClick={goLeft} style={{ fontSize: 32, background: 'none', border: 'none', cursor: 'pointer', color: '#27AE60', zIndex: 2 }} aria-label="Previous">&#8592;</button>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: 900 }}>
            {getVisibleImages().map((img, idx) => (
              <img
                key={img}
                src={img}
                alt={`Adoption moment ${idx + 1}`}
                style={{
                  borderRadius: 16,
                  width: idx === 1 ? 340 : 220,
                  height: idx === 1 ? 220 : 160,
                  objectFit: 'cover',
                  boxShadow: idx === 1 ? '0 4px 24px rgba(68,119,68,0.13)' : '0 2px 8px rgba(68,119,68,0.07)',
                  opacity: idx === 1 ? 1 : 0.7,
                  transform: idx === 1 ? 'scale(1.08)' : 'scale(0.92)',
                  transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
                  zIndex: idx === 1 ? 2 : 1,
                  border: idx === 1 ? '3px solid #27AE60' : 'none',
                  background: '#fff',
                }}
              />
            ))}
          </div>
          <button onClick={goRight} style={{ fontSize: 32, background: 'none', border: 'none', cursor: 'pointer', color: '#27AE60', zIndex: 2 }} aria-label="Next">&#8594;</button>
        </div>
        <div style={{ textAlign: 'center', marginTop: 12 }}>
          {adoptionImages.map((_, idx) => (
            <span key={idx} style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: idx === current ? '#27AE60' : '#C7D2FE', margin: '0 4px' }}></span>
          ))}
        </div>
      </section>
    </div>
  );
}