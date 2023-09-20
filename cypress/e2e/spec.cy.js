describe('Music Player App', () => {
  beforeEach(() => {
    // Visit your app
    cy.visit('http://localhost:3000');
  });

  it('should display the correct current song details', () => {
    cy.get('.song-container').contains(/Beaver Creek/i)
    cy.get('.song-container').should('contain', 'Aso, Middle School, Aviino');
  });

  it('should play  the song correctly', () => {
    cy.get('.player-container .play').click();
    cy.get('audio').should('have.prop', 'paused', false);

  });

  it('should  pause the song correctly', () => {
    cy.get('.player-container .play').click();
    cy.get('audio').should('have.prop', 'paused', false);
    cy.get('.player-container .play').click();
    cy.get('audio').should('have.prop', 'paused', true);
  });

  it('should skip to the next song', () => {
    cy.get('.player-container .skip-forward').click();
    cy.get('.song-container').should('contain', 'Daylight');
  });

  it('should skip to the previous song', () => {
    cy.get('.player-container .skip-back').click();
    cy.get('.song-container').should('contain', 'Under the City Stars');
  });

 
  it('should update the song time when dragged', () => {
    cy.get('.player-container .current-duration').should('contain', '0:00');

    // Get the audio element and set the currentTime property
    cy.get('audio').then(($audio) => {
        $audio[0].currentTime = 50;
    });

    

    cy.get('.player-container .current-duration').should('not.contain', '0:00');
});




  
  

  it('should display the library when libraryStatus is true or the button is clicked', () => {
    cy.get('.nav-container .btn-library').click();
    cy.get('.library-container').should('be.visible');
  });

  it('should hide the library when libraryStatus is false or the button is clicked', () => {
    cy.get('.nav-container .btn-library').click().click();
    cy.get('.library-container').should('not.be.visible');
  });

  it('should change the active song when a song in the library is clicked', () => {
    cy.get('.nav-container .btn-library').click();
    cy.get('.library-container .library-song-container').last().click();
    cy.get('.song-container').should('not.contain', 'Beaver Creek');
  });

  it('should display the correct song duration', () => {
    cy.get('.player-container .total-duration').last().should('not.contain', '0:00');
  });

  it('should update the songInfo when the song is playing', () => {
    cy.get('.player-container .play').click();
    cy.wait(1000);
    cy.get('.player-container .current-duration').first().should('not.contain', '0:00');
    
  });


  it('should update progress bar on song play', () => {
    cy.get('.player-container .play').click();
    cy.wait(4000);  // wait for 5 seconds to allow song to play a bit
    cy.get('.player-container .current-duration').first().should('not.contain', '0:00');
});


  it('should display the song cover image correctly', () => {
    cy.get('.song-container img').should('have.attr', 'src', 'https://chillhop.com/wp-content/uploads/2020/09/0255e8b8c74c90d4a27c594b3452b2daafae608d-1024x1024.jpg');
  });

 



  it('should play the next song automatically when the current song ends', () => {
    cy.get('audio').invoke('prop', 'duration').then((duration) => {
      cy.get('.player-container Input[type="range"]').invoke('val', duration - 1).trigger('change');
      cy.get('.player-container .play').click();
      cy.wait(1000);
      cy.get('.song-container').contains(/Daylight/i)
    });
  });

});
