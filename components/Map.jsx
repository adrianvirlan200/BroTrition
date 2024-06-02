const EmbedMap = () => {
  //   const src = `https://www.google.com/maps/embed/v1/place?key=${
  //     process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  //   }&q=${encodeURIComponent(location)}`;

  const src =
    "https://www.google.com/maps/embed/v1/search?q=gym&key=AIzaSyAKH8slyZmZmCUxqUiTAQiWrMC3vUnLOLc";

  return (
    <div className="w-full h-full">
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0 }}
        src={src}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default EmbedMap;
