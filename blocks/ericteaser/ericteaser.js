import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Eric Teaser block
 * Author in DA as a table named "Ericteaser" with one row:
 * | image | title + text + link |
 */
export default function decorate(block) {
  // Dev: open DevTools → Console to inspect what DA/EDS handed us
  console.log('ericteaser block element:', block);
  console.log('ericteaser outer HTML:', block.outerHTML);
  console.log('ericteaser rows:', [...block.children]);
  [...block.children].forEach((row, rowIndex) => {
    console.log(`row ${rowIndex} cells:`, [...row.children]);
  });

  [...block.children].forEach((row) => {
    [...row.children].forEach((cell) => {
      const hasOnlyPicture = cell.children.length === 1 && cell.querySelector('picture');
      cell.className = hasOnlyPicture ? 'ericteaser-image' : 'ericteaser-body';
    });
  });

  block.querySelectorAll('picture > img').forEach((img) => {
    img.closest('picture').replaceWith(
      createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]),
    );
  });
}
