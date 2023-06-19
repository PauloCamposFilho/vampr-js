class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numVampires = 0;
    let currentVampire = this;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numVampires++;
    }
    return numVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (this.name === name) {
      return this;
    }
    for (const offspring of this.offspring) {
      const foundVampire = offspring.vampireWithName(name);
      if (foundVampire) {
        return foundVampire;
      }
    }
    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let offspringCount = 0;
    for (const offspring of this.offspring) {
      offspringCount += offspring.totalDescendents;
      offspringCount++;
    }
    return offspringCount;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let vampires = [];
    for (const offspring of this.offspring) {
      if (offspring.yearConverted > 1980) {
        vampires.push(offspring);
      }
      vampires = vampires.concat(offspring.allMillennialVampires);
    }
    return vampires;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let myAncestors = [];
    let theirAncestors = [];
    let currentVampire = this;
    // if both vampires are the same, they are their own ancestor.
    if (this === vampire) {
      return this;
    }
    // check if either vampire is the direct parent of the other, if so, they're the common ancestor.
    if (this === vampire.creator) {
      return this;
    } else if (vampire === this.creator) {
      return vampire;
    }

    // if I dont have a creator, I am the first vampire, and the common ancestor.
    if (!this.creator) {
      return this;
    } else if (!vampire.creator) { // if they dont have a creator, they are the first vampire, and the common ancestor.
      return vampire;
    }
    // if we havent found the edge cases yet, we have to go up the family tree. Populate the tree: the vampire object first.
    while (currentVampire.creator) {
      myAncestors.push(currentVampire.creator);
      currentVampire = currentVampire.creator;
    }
    // and then the vampire we are comparing with.
    currentVampire = vampire;
    while (currentVampire.creator) {
      theirAncestors.push(currentVampire.creator);
      currentVampire = currentVampire.creator;
    }
    // time to traverse the family tree upwards
    for (const ancestor of myAncestors) {
      if (theirAncestors.includes(ancestor)) {  // found the first one.
        return ancestor;
      }
    }
    return null;
  }
}

module.exports = Vampire;