class PicturePatreon {
  /**
   *Creates an instance of PicturePatreon.
   * @param {{
   * name: string,
   * pictureUrl: string
   * }} $b
   * @memberof PicturePatreon
   */
  constructor($b) {
    if (!$b) $b = {};
    this.Name = $b.name;
    this.PictureURL = $b.pictureUrl;
  }
  /**
   *
   *
   * @param {string} name
   * @param {string} url
   * @memberof PicturePatreon
   */
  PicturePatreon(name, url) {
    this.Name = name;
    this.PictureURL = url;
  }
}
module.exports = {
  PicturePatreon,
};
