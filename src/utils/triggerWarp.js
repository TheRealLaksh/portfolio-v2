export const triggerWarp = () => {
  const event = new Event('warp-speed');
  window.dispatchEvent(event);
};